const expect = require('expect.js')
const Tree = require('../lib/Tree')

describe('lib/Tree', () => {
  const testItems = [
    {
      id: '1',
      parent: null
    },
    {
      id: '1-1',
      parent: '1'
    },
    {
      id: '1-1-1',
      parent: '1-1'
    },
    {
      id: '1-1-2',
      parent: '1-1'
    },
    {
      id: '1-2',
      parent: '1'
    },
    {
      id: '1-2-1',
      parent: '1-2'
    },
    {
      id: '1-2-2',
      parent: '1-2'
    },
    {
      id: '2',
      parent: null
    }
  ]

  const getIdsFromSet = (set) => {
    return Array.from(set)
      .map(node => node.id)
      .sort()
  }

  it('should accept an array as the first argument of the constructor', (done) => {
    expect(() => new Tree(testItems)).not.to.throwError()
    expect(() => new Tree({ foo: 'bar' })).to.throwError((err) => {
      expect(err).to.be.a(Tree.errors.InvalidArgument)
    })
    done()
  })

  it('should set id property or use a fallback', (done) => {
    const testProperty = 'test-id-property'

    // Items defined, id property as the second argument
    const t1 = new Tree([], testProperty)
    expect(t1.idProperty).to.be(testProperty)

    // Items not defined, id property as the first argument
    const t2 = new Tree(testProperty)
    expect(t2.idProperty).to.be(testProperty)

    // Items defined, id property not given
    const t3 = new Tree(testItems)
    expect(t3.idProperty).to.be(Tree.DEFAULT_ID_PROPERTY)

    // Invalid id property types
    expect(() => new Tree([], [])).to.throwError((err) => {
      expect(err).to.be.a(Tree.errors.InvalidArgument)
    })
    expect(() => new Tree([], {})).to.throwError((err) => {
      expect(err).to.be.a(Tree.errors.InvalidArgument)
    })
    expect(() => new Tree([], 123)).to.throwError((err) => {
      expect(err).to.be.a(Tree.errors.InvalidArgument)
    })

    done()
  })

  it('should set parent property or use a fallback', (done) => {
    const testProperty = 'test-parent-property'

    // Items defined, id property as the second argument
    const t1 = new Tree([], null, testProperty)
    expect(t1.parentProperty).to.be(testProperty)

    // Items not defined, id property as the first argument
    const t2 = new Tree('id', testProperty)
    expect(t2.parentProperty).to.be(testProperty)

    // Items defined, id property not given
    const t3 = new Tree(testItems)
    expect(t3.parentProperty).to.be(Tree.DEFAULT_PARENT_PROPERTY)

    // Invalid parent property types
    expect(() => new Tree([], null, [])).to.throwError((err) => {
      expect(err).to.be.a(Tree.errors.InvalidArgument)
    })
    expect(() => new Tree([], null, {})).to.throwError((err) => {
      expect(err).to.be.a(Tree.errors.InvalidArgument)
    })
    expect(() => new Tree([], null, 123)).to.throwError((err) => {
      expect(err).to.be.a(Tree.errors.InvalidArgument)
    })

    done()
  })

  it('should validate an item before adding', (done) => {
    const tree = new Tree([], 'testId', 'testParent')

    const valid = {
      testId: 1,
      testParent: null
    }

    const invalidWrongProps = {
      id: 1,
      parent: null
    }

    const invalidNoId = {
      testParent: null
    }

    const invalidNoParent = {
      testId: 2
    }

    expect(() => tree.addNodes(invalidWrongProps)).to.throwError((err) => {
      expect(err).to.be.a(Tree.errors.PropertyError)
    })
    expect(() => tree.addNodes([invalidWrongProps])).to.throwError((err) => {
      expect(err).to.be.a(Tree.errors.PropertyError)
    })
    expect(() => tree.addNodes([invalidNoId])).to.throwError((err) => {
      expect(err).to.be.a(Tree.errors.PropertyError)
    })
    expect(() => tree.addNodes([invalidNoParent])).to.throwError((err) => {
      expect(err).to.be.a(Tree.errors.PropertyError)
    })

    expect(() => tree.addNodes(valid)).not.to.throwError()
    expect(() => tree.addNodes([valid])).not.to.throwError()

    done()
  })

  it('should add nodes from the constructor', (done) => {
    const tree = new Tree(testItems)
    expect(Array.from(tree.nodes).map(node => node.item)).to.eql(testItems)

    Array.from(tree.nodes)
      .forEach(node => {
        expect(testItems).to.contain(tree.mapped[node.id].item)
      })

    done()
  })

  it('should add nodes with addNodes', (done) => {
    const tree = new Tree()
    const rval = tree.addNodes(testItems)
    expect(Array.from(tree.nodes).map(node => node.item)).to.eql(testItems)
    expect(rval).to.be(tree)

    Array.from(tree.nodes)
      .forEach(node => {
        expect(testItems).to.contain(tree.mapped[node.id].item)
      })

    done()
  })

  it('should map parent to each node', (done) => {
    const tree = new Tree(testItems)
    const mapped = tree.mapped

    // Main level
    expect(mapped['1'].parent).to.be(null)
    expect(mapped['2'].parent).to.be(null)

    // First level
    expect(mapped['1-1'].parent.id).to.be('1')
    expect(mapped['1-2'].parent.id).to.be('1')

    // Second level
    expect(mapped['1-1-1'].parent.id).to.be('1-1')
    expect(mapped['1-1-2'].parent.id).to.be('1-1')
    expect(mapped['1-2-1'].parent.id).to.be('1-2')
    expect(mapped['1-2-2'].parent.id).to.be('1-2')

    done()
  })

  it('should throw an error when parent is not in the dataset', (done) => {
    const tree = new Tree(testItems)
    expect(() => tree.addNode({ id: '1-2-3', parent: '1-2' })).not.to.throwError()
    expect(() => tree.addNode({ id: '3', parent: null })).not.to.throwError()
    expect(() => tree.addNode({ id: '1-3-1', parent: '1-3' })).to.throwError((err) => {
      expect(err).to.be.a(Tree.errors.NodeNotFound)
    })
    expect(() => tree.addNode({ id: '1-3', parent: '1' })).not.to.throwError()
    done()
  })

  it('should map parents and children to each node', (done) => {
    const tree = new Tree(testItems)
    const mapped = tree.mapped

    // Main level
    expect(getIdsFromSet(mapped['1'].parents)).to.eql([])
    expect(getIdsFromSet(mapped['1'].children)).to.eql(['1-1', '1-2'])

    expect(getIdsFromSet(mapped['2'].parents)).to.eql([])
    expect(getIdsFromSet(mapped['2'].children)).to.eql([])

    expect(getIdsFromSet(mapped['1-1'].parents)).to.eql(['1'])
    expect(getIdsFromSet(mapped['1-1'].children)).to.eql(['1-1-1', '1-1-2'])

    expect(getIdsFromSet(mapped['1-2'].parents)).to.eql(['1'])
    expect(getIdsFromSet(mapped['1-2'].children)).to.eql(['1-2-1', '1-2-2'])

    expect(getIdsFromSet(mapped['1-1-1'].parents)).to.eql(['1', '1-1'])
    expect(getIdsFromSet(mapped['1-1-1'].children)).to.eql([])

    expect(getIdsFromSet(mapped['1-1-2'].parents)).to.eql(['1', '1-1'])
    expect(getIdsFromSet(mapped['1-1-2'].children)).to.eql([])

    done()
  })

  it('should remap parents and children to each added node', (done) => {
    const tree = new Tree(testItems)
    const mapped = tree.mapped

    // Main level
    expect(getIdsFromSet(mapped['2'].parents)).to.eql([])
    expect(getIdsFromSet(mapped['2'].children)).to.eql([])

    tree.addNode({ id: '2-1', parent: '2' })
    tree.addNode({ id: '2-2', parent: '2' })

    expect(getIdsFromSet(mapped['2'].children)).to.eql(['2-1', '2-2'])

    done()
  })

  it('should resolve node by id, original item and node', (done) => {
    const tree = new Tree(testItems)
    const mapped = tree.mapped

    expect(tree.getNode(mapped['1'])).to.be(mapped['1'])
    expect(tree.getNode(testItems[0])).to.be(mapped['1'])
    expect(tree.getNode('1')).to.be(mapped['1'])

    expect(tree.getNode({})).to.eql(undefined)
    expect(tree.getNode('3-2-1')).to.eql(undefined)

    done()
  })

  it('should get branch for the given needle', (done) => {
    const tree = new Tree(testItems)
    expect(() => tree.getBranch('3')).to.throwError((err) => {
      expect(err).to.be.a(Tree.errors.NodeNotFound)
    })
    expect(getIdsFromSet(tree.getBranch('2'))).to.eql(['2'])
    expect(getIdsFromSet(tree.getBranch('1'))).to.eql(['1', '1-1', '1-1-1', '1-1-2', '1-2', '1-2-1', '1-2-2'])

    done()
  })

  it('should get parents for the given needle', (done) => {
    const tree = new Tree(testItems)
    expect(() => tree.getParents('3')).to.throwError((err) => {
      expect(err).to.be.a(Tree.errors.NodeNotFound)
    })
    expect(getIdsFromSet(tree.getParents('2'))).to.eql([])
    expect(getIdsFromSet(tree.getParents('1-1-2'))).to.eql(['1', '1-1'])

    done()
  })

  it('should find if the given needle is in the given tree', (done) => {
    const tree = new Tree(testItems)

    // Needle not found
    expect(() => tree.isInTree('3', tree.nodes)).to.throwError((err) => {
      expect(err).to.be.a(Tree.errors.NodeNotFound)
    })

    // Haystack not found
    expect(() => tree.isInTree('1', '3')).to.throwError((err) => {
      expect(err).to.be.a(Tree.errors.NodeNotFound)
    })

    // Needle not found from tree
    expect(tree.isInTree('1', '2')).to.be(false)

    // Same node
    expect(tree.isInTree('1', '1')).to.be(true)

    // Direct parent
    expect(tree.isInTree('1-1', '1')).to.be(true)

    // Part of the same tree
    expect(tree.isInTree('1-1-1', '1')).to.be(true)

    done()
  })

  it('should get root for the given needle', (done) => {
    const tree = new Tree(testItems)

    // Needle not found
    expect(() => tree.getRoot('3', tree.nodes)).to.throwError((err) => {
      expect(err).to.be.a(Tree.errors.NodeNotFound)
    })

    expect(tree.getRoot('1')).to.be(testItems[0])
    expect(tree.getRoot('1-1')).to.be(testItems[0])
    expect(tree.getRoot('1-1-1')).to.be(testItems[0])
    done()
  })

  it('should get leaves or the outmost parts for the branch', (done) => {
    const tree = new Tree(testItems)

    // Needle not found
    expect(() => tree.getLeaves('3', tree.nodes)).to.throwError((err) => {
      expect(err).to.be.a(Tree.errors.NodeNotFound)
    })

    expect(getIdsFromSet(tree.getLeaves('2'))).to.eql(['2'])
    expect(getIdsFromSet(tree.getLeaves('1'))).to.eql(['1-1-1', '1-1-2', '1-2-1', '1-2-2'])
    done()
  })
})
