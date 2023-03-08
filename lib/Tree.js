const castToArray = require('./castToArray')
const Dataset = require('./Dataset')

class Node {
  /**
   * Get node level
   */
  get level () {
    return this.parents.size + 1
  }

  constructor (id, item) {
    this.id = id
    this.item = item

    this.parent = null
    this.children = new Dataset()
    this.parents = new Dataset()
    this.branch = new Dataset()
  }
}

/**
 * Tree error baseclass
 *
 * @class TreeError
 * @implements Error
 */
class TreeError extends Error {}

/**
 * PropertyError
 *
 * @class PropertyError
 * @implements TreeError
 */
class PropertyError extends TreeError {}

/**
 * InvalidArgument
 *
 * @class PropertyError
 * @implements TreeError
 */
class InvalidArgument extends TreeError {}

/**
 * NodeNotFound
 *
 * @class NodeNotFound
 * @implements TreeError
 */
class NodeNotFound extends TreeError {}

/**
 * Tree traversal class
 *
 * @class Tree
 * @param { object[] } [items]                  Items
 * @param { string } [idProperty='id']          Attribute used for identifier
 * @param { string } [parentProperty='parent']  Attribute used for parent
 */
class Tree {
  /**
   * Errors
   *
   * @static
   * @const Tree.errors
   */
  static get errors () {
    return {
      InvalidArgument,
      NodeNotFound,
      PropertyError,
      TreeError
    }
  }

  /**
   * Default id property
   *
   * @const { string } Tree.DEFAULT_ID_PROPERTY
   * @default id
   */
  static get DEFAULT_ID_PROPERTY () {
    return 'id'
  }

  /**
   * Default parent property
   *
   * @const { string } Tree.DEFAULT_PARENT_PROPERTY
   * @default parent
   */
  static get DEFAULT_PARENT_PROPERTY () {
    return 'parent'
  }

  constructor (...args) {
    const a = args.slice()

    const items = a.length === 3 || typeof a[0] !== 'string' || Array.isArray(a[0]) ? a.shift() : null
    const idProperty = a.shift() || this.constructor.DEFAULT_ID_PROPERTY
    const parentProperty = a.shift() || this.constructor.DEFAULT_PARENT_PROPERTY

    if (items && !Array.isArray(items)) {
      throw new InvalidArgument('Tree accepts only an array as the first argument of the constructor')
    }

    if (typeof idProperty !== 'string') {
      throw new InvalidArgument('Invalid id property given, expected a string')
    }

    if (typeof parentProperty !== 'string') {
      throw new InvalidArgument('Invalid parent property given, expected a string')
    }

    this.idProperty = idProperty
    this.parentProperty = parentProperty

    this.nodes = new Dataset()
    this.mapped = {}
    this.addNodes(items)
  }

  /**
   * An alias to addNodes
   *
   * @method Tree#addNode
   * @alias Tree#addNodes
   * @return { Tree }                 This instance
   */
  addNode (...args) {
    return this.addNodes(...args)
  }

  /**
   * Add nodes to the tree
   *
   * @method Tree#addNodes
   * @param { object|object[] } items Nodes to add
   * @return { Tree }                 This instance
   */
  addNodes (items) {
    items = castToArray(items)

    // Check item validity and add
    items.forEach((item) => {
      if (!(this.idProperty in item)) {
        throw new PropertyError(`No valid id property "${this.idProperty}" found from ${JSON.stringify(item)}`)
      }

      if (!(this.parentProperty in item)) {
        throw new PropertyError(`No valid parent property "${this.parentProperty}" found from ${JSON.stringify(item)}`)
      }

      const id = item[this.idProperty]
      const node = new Node(id, item)

      this.nodes.add(node)
      this.mapped[id] = node
    })

    // Set parent node
    for (const id in this.mapped) {
      const node = this.mapped[id]
      const parentId = node.item[this.parentProperty]

      if (parentId) {
        if (!this.mapped[parentId]) {
          throw new NodeNotFound(`Parent "${parentId}" not found`)
        }

        node.parent = this.mapped[parentId]
      }
    }

    // Set children and parents
    for (const id in this.mapped) {
      const node = this.mapped[id]

      let parent = node.parent
      let tmp = node

      while (parent) {
        parent.children.add(tmp)
        node.parents.add(parent)

        // Traverse the next node
        tmp = parent
        parent = parent.parent
      }
    }

    // Set branch for each node
    for (const id in this.mapped) {
      const node = this.mapped[id]
      node.branch = this.getBranch(node, true)
    }

    return this
  }

  /**
   * Get node
   *
   * @method Tree#getNode
   * @param { mixed } needle          Needle to search
   * @return { Node }                 Matching node
   */
  getNode (needle) {
    if (needle instanceof Node) {
      return needle
    }

    if (['number', 'string'].includes(typeof needle)) {
      return this.mapped[needle]
    }

    const id = needle[this.idProperty]

    if (this.mapped[id]) {
      return this.mapped[id]
    }
  }

  /**
   * Get branch starting from the given node
   *
   * @method Tree#getBranch
   * @param { mixed } needle          Needle to search
   * @param { boolean } [metadata]    Flag to define if the function should return Nodes instead of original objects
   * @return { object[] }             Original items of the branch
   */
  getBranch (needle, metadata = false) {
    const main = this.getNode(needle)

    if (!main) {
      throw new NodeNotFound(`No matching node found for ${JSON.stringify(needle)}`)
    }

    const branch = new Dataset()

    /**
     * Internal tree traversal helper function
     *
     * @private
     * @param { Node } node           Node to traverse
     */
    const traverseBranch = (node) => {
      branch.add(metadata ? node : node.item)
      node.children.forEach(child => traverseBranch(child))
    }

    traverseBranch(main)

    return branch
  }

  /**
   * Get branch starting from the given node
   *
   * @method Tree#getParents
   * @param { mixed } needle          Needle to search
   * @param { boolean } [metadata]    Flag to define if the function should return Nodes instead of original objects
   * @return { object[] }             Original items of the parent tree
   */
  getParents (needle, metadata) {
    const node = this.getNode(needle)

    if (!node) {
      throw new NodeNotFound(`No matching node found for ${JSON.stringify(needle)}`)
    }

    const parents = []

    node.parents.forEach((node) => {
      parents.push(metadata ? node : node.item)
    })

    return parents
  }

  /**
   * Get root node for the given needle
   *
   * @method Tree#getParents
   * @param { mixed } needle          Needle to search
   * @param { boolean } [metadata]    Flag to define if the function should return Nodes instead of original objects
   * @return { object }               Original items of the parent tree
   */
  getRoot (needle, metadata) {
    let node = this.getNode(needle)

    if (!node) {
      throw new NodeNotFound(`No matching node found for ${JSON.stringify(needle)}`)
    }

    while (node.parent) {
      node = node.parent
    }

    return metadata ? node : node.item
  }

  /**
   * Get leaves or the outmost part of the branch for the given needle
   *
   * @method Tree#getParents
   * @param { mixed } [needle]        Needle to search
   * @param { boolean } [metadata]    Flag to define if the function should return Nodes instead of original objects
   * @return { object }               Original items of the parent tree
   */
  getLeaves (needle, metadata) {
    if (!needle) {
      return this.nodes
        .filter(node => !node.children.size)
        .map(node => metadata ? node : node.item)
    }

    const branch = this.getBranch(needle, true)
    const leaves = new Dataset()

    branch.forEach((node) => {
      if (node.children.size) {
        return
      }

      leaves.add(metadata ? node : node.item)
    })

    return leaves
  }

  /**
   * Get branch starting from the given node
   *
   * @method Tree#isInTree
   * @param { mixed } needle          Needle to search
   * @param { mixed } haystack        Haystrack to search
   * @param { boolean } [metadata]    Flag to define if the function should return Nodes instead of original objects
   * @return { boolean }              True if in the same tree, false if not
   */
  isInTree (needle, haystack) {
    const node = this.getNode(needle)

    if (!node) {
      throw new NodeNotFound(`No matching node found for ${JSON.stringify(needle)}`)
    }

    return this.getBranch(haystack, true).has(node)
  }

  /**
   * Get tree contents
   *
   * @param { boolean } [metadata]    Flag to define if the function should return Nodes instead of original objects
   */
  getItems (metadata) {
    return this.nodes.map(node => metadata ? node : node.item)
  }
}

module.exports = Tree
