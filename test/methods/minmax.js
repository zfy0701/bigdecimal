if (typeof Test === 'undefined') require('../tester');

Test('minimum and maximum', function () {

    var t = function (value){
        Test.isTrue(value);
    }

    BigDecimal.config({
        DECIMAL_PLACES: 20,
        ROUNDING_MODE: 4,
        EXPONENTIAL_AT: [-7, 21],
        RANGE: 1e9
    });

    Test.areEqual(BigDecimal.maximum, BigDecimal.max);
    Test.areEqual(BigDecimal.minimum, BigDecimal.min);

    t(!BigDecimal.min(0, 0, 0).isNaN());
    t(BigDecimal.min(NaN, -2, 0, -1).isNaN());
    t(BigDecimal.max(NaN, -2, 0, -1).isNaN());
    t(BigDecimal.min(-2, 0, -1, new BigDecimal(NaN)).isNaN());
    t(BigDecimal.max(-2, 0, -1, new BigDecimal(NaN)).isNaN());

    t(!BigDecimal.min(-2, 0, -1).isNaN());
    t(!BigDecimal.max(-2, 0, -1).isNaN());
    t(!BigDecimal.min(-2, 0, -1, Infinity).isNaN());
    t(!BigDecimal.max(-2, 0, -1, -Infinity).isNaN());
    t(!BigDecimal.min(-2, 0, -1, Infinity).isNaN());
    t(!BigDecimal.max(-2, 0, -1, Infinity).isNaN());
    t(!BigDecimal.min(-2, -Infinity, 0, -1, Infinity).isNaN());

    t(new BigDecimal(-Infinity).eq(BigDecimal.min(-Infinity, -2, 0, -1, Infinity)));
    t(new BigDecimal(-Infinity).eq(BigDecimal.min(Infinity, -2, 0, -1, -Infinity)));
    t(new BigDecimal(Infinity).eq(BigDecimal.max(Infinity, -2, 0, -1, -Infinity)));
    t(new BigDecimal(Infinity).eq(BigDecimal.max(-Infinity, -2, 0, new BigDecimal(Infinity), -1)));

    t(new BigDecimal(-2).eq(BigDecimal.min(-2, 0, -1)));
    t(new BigDecimal(0).eq(BigDecimal.max(-2, 0, -1)));
    t(new BigDecimal(-2).eq(BigDecimal.min(-2, -1, 0)));
    t(new BigDecimal(0).eq(BigDecimal.max(-2, -1, 0)));
    t(new BigDecimal(-2).eq(BigDecimal.min(0, -2, -1)));
    t(new BigDecimal(0).eq(BigDecimal.max(0, -2, -1)));
    t(new BigDecimal(-2).eq(BigDecimal.min(0, -1, -2)));
    t(new BigDecimal(0).eq(BigDecimal.max(0, -1, -2)));
    t(new BigDecimal(-2).eq(BigDecimal.min(-1, -2, 0)));
    t(new BigDecimal(0).eq(BigDecimal.max(-1, -2, 0)));
    t(new BigDecimal(-2).eq(BigDecimal.min(-1, 0, -2)));

    t(new BigDecimal(-1).eq(BigDecimal.min(-1, 0, 1)));
    t(new BigDecimal(1).eq(BigDecimal.max(-1, 0, 1)));
    t(new BigDecimal(-1).eq(BigDecimal.min(-1, 1, 0)));
    t(new BigDecimal(1).eq(BigDecimal.max(-1, 1, 0)));
    t(new BigDecimal(-1).eq(BigDecimal.min(0, -1, 1)));
    t(new BigDecimal(1).eq(BigDecimal.max(0, -1, 1)));
    t(new BigDecimal(-1).eq(BigDecimal.min(0, 1, -1)));
    t(new BigDecimal(1).eq(BigDecimal.max(0, 1, -1)));
    t(new BigDecimal(-1).eq(BigDecimal.min(1, -1, 0)));
    t(new BigDecimal(1).eq(BigDecimal.max(1, -1, 0)));
    t(new BigDecimal(-1).eq(BigDecimal.min(1, 0, -1)));

    t(new BigDecimal(-1).eq(BigDecimal.min('-1', 0, new BigDecimal(1))));
    t(new BigDecimal(1).eq(BigDecimal.max('-1', 0, new BigDecimal(1))));
    t(new BigDecimal(-1).eq(BigDecimal.min('-1', new BigDecimal(1), 0)));
    t(new BigDecimal(1).eq(BigDecimal.max('-1', new BigDecimal(1), 0)));
    t(new BigDecimal(-1).eq(BigDecimal.min(0, '-1', new BigDecimal(1))));
    t(new BigDecimal(1).eq(BigDecimal.max(0, '-1', new BigDecimal(1))));
    t(new BigDecimal(-1).eq(BigDecimal.min(0, new BigDecimal(1), '-1')));
    t(new BigDecimal(1).eq(BigDecimal.max(0, new BigDecimal(1), '-1')));
    t(new BigDecimal(-1).eq(BigDecimal.min(new BigDecimal(1), '-1', 0)));
    t(new BigDecimal(1).eq(BigDecimal.max(new BigDecimal(1), '-1', 0)));
    t(new BigDecimal(-1).eq(BigDecimal.min(new BigDecimal(1), 0, '-1')));

    t(new BigDecimal(0).eq(BigDecimal.min(0, 1, 2)));
    t(new BigDecimal(2).eq(BigDecimal.max(0, 1, 2)));
    t(new BigDecimal(0).eq(BigDecimal.min(0, 2, 1)));
    t(new BigDecimal(2).eq(BigDecimal.max(0, 2, 1)));
    t(new BigDecimal(0).eq(BigDecimal.min(1, 0, 2)));
    t(new BigDecimal(2).eq(BigDecimal.max(1, 0, 2)));
    t(new BigDecimal(0).eq(BigDecimal.min(1, 2, 0)));
    t(new BigDecimal(2).eq(BigDecimal.max(1, 2, 0)));
    t(new BigDecimal(0).eq(BigDecimal.min(2, 1, 0)));
    t(new BigDecimal(2).eq(BigDecimal.max(2, 1, 0)));
    t(new BigDecimal(0).eq(BigDecimal.min(2, 0, 1)));
    t(new BigDecimal(2).eq(BigDecimal.max(2, 0, 1)));

    t = function (min, max, arr) {
        Test.isTrue(new BigDecimal(min).eq(BigDecimal.min.apply(null, arr)));
        Test.isTrue(new BigDecimal(max).eq(BigDecimal.max.apply(null, arr)));
    }

    t(-2, 0, [-2, -1, 0]);
    t(-2, 0, [-2, 0, -1]);
    t(-2, 0, [-1, -2, 0]);
    t(-2, 0, [-1, 0, -2]);
    t(-2, 0, [0, -2, -1]);
    t(-2, 0, [0, -1, -2]);

    t(-1, 1, [-1, 0, 1]);
    t(-1, 1, [-1, 1, 0]);
    t(-1, 1, [0, -1, 1]);
    t(-1, 1, [0, 1, -1]);
    t(-1, 1, [1, -1, 0]);
    t(-1, 1, [1, 0, -1]);

    t(0, 2, [0, 1, 2]);
    t(0, 2, [0, 2, 1]);
    t(0, 2, [1, 0, 2]);
    t(0, 2, [1, 2, 0]);
    t(0, 2, [2, 1, 0]);
    t(0, 2, [2, 0, 1]);

    t(-0.000001, 999.001, [2, -0, '1e-9000000000000000', 324.32423423, -0.000001, '999.001', 10]);
    t('-9.99999e+9000000000000000', Infinity, [10, '-9.99999e+9000000000000000', new BigDecimal(Infinity), '9.99999e+9000000000000000', 0]);
    t('-9.999999e+9000000000000000', '1.01e+9000000000000000', ['-9.99998e+9000000000000000', '-9.999999e+9000000000000000', '9e+8999999999999999', '1.01e+9000000000000000', 1e+300]);
    t(1, Infinity, [1, '1e+9000000000000001', 1e200]);
    t(-Infinity, 1, [1, '-1e+9000000000000001', -1e200]);
    t(0, 1, [1, '1e-9000000000000001', 1e-200]);
    t(0, 1, [1, '-1e-9000000000000001', 1e-200]);
    t(-3, 3, [1, '2', 3, '-1', -2, '-3']);
});
