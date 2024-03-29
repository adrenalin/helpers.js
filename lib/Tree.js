const castToArray = require('./castToArray')
const Dataset = require('./Dataset')
const Datamap = require('./Datamap')

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
 * @example
 *
 *     const nodes = [
 *       {
 *         attr_id: 1,
 *         attr_parent: null
 *       },
 *       {
 *         attr_id: 11,
 *         attr_parent: 1
 *       },
 *       {
 *         attr_id: 12,
 *         attr_parent: 1
 *       },
 *       {
 *         attr_id: 2,
 *         attr_parent: null
 *       }
 *     ]
 *     const tree = new Tree(nodes, 'attr_id', 'attr_parent)
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

    const items = a.length === 3 || typeof a[0] !== 'string' || Array.isArray(a[0]) || a[0] instanceof Set ? a.shift() : null
    const idProperty = a.shift() || this.constructor.DEFAULT_ID_PROPERTY
    const parentProperty = a.shift() || this.constructor.DEFAULT_PARENT_PROPERTY

    if (items && !(Array.isArray(items) || items instanceof Set)) {
      throw new InvalidArgument('Tree accepts only an array or a Set as the first argument of the constructor')
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
    this.mapped = new Datamap()
    this.addNodes(items)
  }

  /**
   * An alias to addNodes
   *
   * @method Tree#addNode
   * @alias Tree#addNodes
   * @return { Tree }                 This instance
   */
  get addNode () {
    return this.addNodes
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
      this.mapped.set(id, node)
    })

    // Set parent node
    for (const id of this.mapped.keys()) {
      const node = this.mapped.get(id)
      const parentId = node.item[this.parentProperty]

      if (parentId) {
        if (!this.mapped.get(parentId)) {
          throw new NodeNotFound(`Parent "${parentId}" not found`)
        }

        node.parent = this.mapped.get(parentId)
      }
    }

    // Set children and parents
    for (const id of this.mapped.keys()) {
      const node = this.mapped.get(id)

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
    for (const id of this.mapped.keys()) {
      const node = this.mapped.get(id)
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
      return this.mapped.get(needle)
    }

    const id = needle[this.idProperty]

    if (this.mapped.get(id)) {
      return this.mapped.get(id)
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

  /**
   * Remove an item
   *
   * @method Tree#removeItem
   * @param { mixed } needle          Needle to search
   */
  removeItem (needle) {
    const node = this.getNode(needle)

    this.getBranch(needle)
      .forEach((n) => {
        this.nodes.delete(n)
        this.mapped.delete(n.id)
      })

    this.nodes.delete(node)
    this.mapped.delete(node.id)

    return this
  }

  /**
   * Remove multiple items or flush the whole tree if no needle is provided
   *
   * @method Tree#removeItems
   * @param { mixed } [needles]       Needles to search
   */
  removeItems (...needles) {
    if (!needles.length) {
      needles = this.getItems(true)
    }

    castToArray(needles)
      .forEach((arg) => castToArray(arg).forEach(needle => this.removeItem(needle)))

    return this
  }

  /**
   * Flush the whole tree
   *
   * @method Tree#removeItems
   * @param { mixed } [needles]       Needles to search
   */
  flush () {
    return this.removeItems()
  }
}

Tree.Node = Node

module.exports = Tree
