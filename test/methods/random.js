if (typeof Test === 'undefined') require('../tester');

Test('random', function () {
    var dp, i, msg, r;

    BigDecimal.config({ CRYPTO: false });

    for ( i = 0; i < 4994; i++ ) {

        if ( i & 1 ) {
            dp = Math.random() * 100 + 1 | 0;
            BigDecimal.config({ DECIMAL_PLACES: dp });
            r = BigDecimal.random();
        } else {
            dp = Math.random() * 100 | 0;
            r = BigDecimal.random(dp);
        }

        //Test.write('\n  dp: ' + dp + '  r: ' + r.toString());

        // Check that the random number r has a maximum of dp decimal places.
        if ( r.dp() > dp ) {
            msg = 'r.dp() > dp';

        // Check 0 <= r < 1
        } else if ( r.lt(0) || r.gte(1) ) {
            msg = 'r.lt(0) || r.gte(1)';

        // Check that the attributes of r are formed correctly.
        } else if ( !r.eq( new BigDecimal(r) ) || !r.eq( new BigDecimal( r.toString() ) ) ) {
            msg = '!r.eq( new BigNumber(r) ) || !r.eq( new BigNumber( r.toString() ) )';
        }

        Test.isTrue( msg === undefined );

        if ( msg !== undefined ) {
            Test.write('\n  Random number r failed integrity test: ' + msg);
            Test.write('\n  r:    ' + r);
            Test.write('\n  r.c:  ' + r.c);
            Test.write('\n  r.e:  ' + r.e);
            Test.write('\n  r.s:  ' + r.s);
            Test.write('\n  r.dp: ' + r.dp());
            Test.write('\n  dp:   ' + dp);
            msg = undefined;
        }
    }

    BigDecimal.random(undefined);
    BigDecimal.random(null);
    BigDecimal.random(3);
    BigDecimal.random(0);

    Test.isException(function () { BigDecimal.random(Infinity) }, 'Infinity');
    Test.isException(function () { BigDecimal.random('-Infinity') }, "'-Infinity'");
    Test.isException(function () { BigDecimal.random(NaN) }, 'NaN');
    Test.isException(function () { BigDecimal.random('ugh') }, "'ugh'");
    Test.isException(function () { BigDecimal.random(-1) }, "-1");
    Test.isException(function () { BigDecimal.random({}) }, "{}");
});
