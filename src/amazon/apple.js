/*
* @Problem:
* There is row of trees. Each tree has different amount of apples.
* There are two person, each of which could gather the apples only from certain amount of trees.
* Find the maximum number of apples which they could gather, taking into account that
* they cannot take the apples from the same tree.
* */

function execute(trees, firstPerson, secondPerson) {
    var result = [];
    const treesCount = trees.length;

    trees.forEach(function (currentTree, treeIndex) {
        if (treeIndex + firstPerson >= treesCount) {
            const sum = getSumFromArray(trees, treeIndex, firstPerson);

            const leftTrees = trees.slice(0, treeIndex);
            const rightTrees = trees.slice(treeIndex);
        }
    });
}

// helpers
function getSumFromArray(arr, index, amount) {
}

describe('Amazon:Apple', function () {
    it('should return empty array', function () {
        var treesWithApples = [5, 5, 1];
        var firstPerson = 2; // could gather apples from 2 trees
        var secondPerson = 1; // could gather apples from 2 trees

        expect(execute(treesWithApples, firstPerson, secondPerson)).toBe(11);
    });
});
