if (typeof Test === 'undefined') require('../tester');

Test('sum', function () {

    function t(expected, value){
        Test.isTrue(expected.eq(value));
    }

    var expectedSum = new BigDecimal(600);
    t(expectedSum, BigDecimal.sum(100, 200, 300));
    t(expectedSum, BigDecimal.sum('100', '200', '300'));
    t(expectedSum, BigDecimal.sum(new BigDecimal(100), new BigDecimal(200), new BigDecimal(300)));
    t(expectedSum, BigDecimal.sum(100, '200', new BigDecimal(300)));
    t(expectedSum, BigDecimal.sum(99.9, 200.05, 300.05));
});