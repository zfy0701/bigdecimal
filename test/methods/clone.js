if (typeof Test === 'undefined') require('../tester');

Test('clone', function () {

    function t(value) {
        Test.isTrue(value);
    }

    var Big = BigDecimal.clone();

    var x = new Big(0);
    var y = new Big('1');

    t(x instanceof Big);
    t(y instanceof Big);
    t(!(x instanceof BigDecimal));
    t(!(y instanceof BigDecimal));

    t(BigDecimal.isBigNumber(x));
    t(BigDecimal.isBigNumber(y));

    t(Big.isBigNumber(x));
    t(Big.isBigNumber(y));

    var z = new BigDecimal(x);

    t(z instanceof BigDecimal);
    t(!(z instanceof Big));

    t(BigDecimal.isBigNumber(z));
    t(Big.isBigNumber(z));

    t(x.eq(z));
    t(!x.eq(y));
    t(!z.eq(y));

    AnotherBig = Big.clone();

    xx = new AnotherBig(0);
    yy = new AnotherBig('1');

    t(xx instanceof AnotherBig);
    t(!(xx instanceof BigDecimal));
    t(!(yy instanceof BigDecimal));
    t(!(xx instanceof Big));
    t(!(yy instanceof Big));

    t(Big.isBigNumber(xx));
    t(Big.isBigNumber(yy));

    t(AnotherBig.isBigNumber(xx));
    t(AnotherBig.isBigNumber(yy));

    zz = new Big(z);

    t(zz instanceof Big);
    t(!(zz instanceof AnotherBig));
    t(!(zz instanceof BigDecimal));

    t(zz.eq(x));
    t(zz.eq(xx));
    t(zz.eq(z));
    t(!zz.eq(y));
    t(!zz.eq(yy));
});
