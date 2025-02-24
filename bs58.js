!(function (e) {
    if ('object' == typeof exports && 'undefined' != typeof module) module.exports = e();
    else if ('function' == typeof define && define.amd) define([], e);
    else {
        var t;
        (t =
            'undefined' != typeof window
                ? window
                : 'undefined' != typeof global
                ? global
                : 'undefined' != typeof self
                ? self
                : this).bs58 = e();
    }
})(function () {
    return (function () {
        function e(t, r, n) {
            function o(i, u) {
                if (!r[i]) {
                    if (!t[i]) {
                        var l = 'function' == typeof require && require;
                        if (!u && l) return l(i, !0);
                        if (f) return f(i, !0);
                        var a = Error("Cannot find module '" + i + "'");
                        throw ((a.code = 'MODULE_NOT_FOUND'), a);
                    }
                    var c = (r[i] = { exports: {} });
                    t[i][0].call(
                        c.exports,
                        function (e) {
                            return o(t[i][1][e] || e);
                        },
                        c,
                        c.exports,
                        e,
                        t,
                        r,
                        n
                    );
                }
                return r[i].exports;
            }

            for (
                var f = 'function' == typeof require && require, i = 0;
                i < n.length;
                i++
            )
                o(n[i]);
            return o;
        }

        return e;
    })()(
        {
            1: [
                function (e, t, r) {
                    'use strict';
                    Object.defineProperty(r, '__esModule', { value: !0 }),
                        (r.default = function e(t) {
                            if (t.length >= 255) throw TypeError('Alphabet too long');
                            let r = new Uint8Array(256);
                            for (let n = 0; n < r.length; n++) r[n] = 255;
                            for (let o = 0; o < t.length; o++) {
                                let f = t.charAt(o),
                                    i = f.charCodeAt(0);
                                if (255 !== r[i]) throw TypeError(f + ' is ambiguous');
                                r[i] = o;
                            }
                            let u = t.length,
                                l = t.charAt(0),
                                a = Math.log(u) / Math.log(256),
                                c = Math.log(256) / Math.log(u);

                            function $(e) {
                                if ('string' != typeof e)
                                    throw TypeError('Expected String');
                                if (0 === e.length) return new Uint8Array();
                                let t = 0,
                                    n = 0,
                                    o = 0;
                                for (; e[t] === l; ) n++, t++;
                                let f = ((e.length - t) * a + 1) >>> 0,
                                    i = new Uint8Array(f);
                                for (; e[t]; ) {
                                    let c = r[e.charCodeAt(t)];
                                    if (255 === c) return;
                                    let $ = 0;
                                    for (
                                        let s = f - 1;
                                        (0 !== c || $ < o) && -1 !== s;
                                        s--, $++
                                    )
                                        (c += (u * i[s]) >>> 0),
                                            (i[s] = c % 256 >>> 0),
                                            (c = (c / 256) >>> 0);
                                    if (0 !== c) throw Error('Non-zero carry');
                                    (o = $), t++;
                                }
                                let d = f - o;
                                for (; d !== f && 0 === i[d]; ) d++;
                                let h = new Uint8Array(n + (f - d)),
                                    p = n;
                                for (; d !== f; ) h[p++] = i[d++];
                                return h;
                            }

                            return {
                                encode: function e(r) {
                                    if (
                                        (r instanceof Uint8Array ||
                                            (ArrayBuffer.isView(r)
                                                ? (r = new Uint8Array(
                                                      r.buffer,
                                                      r.byteOffset,
                                                      r.byteLength
                                                  ))
                                                : Array.isArray(r) &&
                                                  (r = Uint8Array.from(r))),
                                        !(r instanceof Uint8Array))
                                    )
                                        throw TypeError('Expected Uint8Array');
                                    if (0 === r.length) return '';
                                    let n = 0,
                                        o = 0,
                                        f = 0,
                                        i = r.length;
                                    for (; f !== i && 0 === r[f]; ) f++, n++;
                                    let a = ((i - f) * c + 1) >>> 0,
                                        $ = new Uint8Array(a);
                                    for (; f !== i; ) {
                                        let s = r[f],
                                            d = 0;
                                        for (
                                            let h = a - 1;
                                            (0 !== s || d < o) && -1 !== h;
                                            h--, d++
                                        )
                                            (s += (256 * $[h]) >>> 0),
                                                ($[h] = s % u >>> 0),
                                                (s = (s / u) >>> 0);
                                        if (0 !== s) throw Error('Non-zero carry');
                                        (o = d), f++;
                                    }
                                    let p = a - o;
                                    for (; p !== a && 0 === $[p]; ) p++;
                                    let g = l.repeat(n);
                                    for (; p < a; ++p) g += t.charAt($[p]);
                                    return g;
                                },
                                decodeUnsafe: $,
                                decode: function e(t) {
                                    let r = $(t);
                                    if (r) return r;
                                    throw Error('Non-base' + u + ' character');
                                }
                            };
                        });
                },
                {}
            ],
            2: [
                function (e, t, r) {
                    'use strict';
                    var n =
                        (this && this.__importDefault) ||
                        function (e) {
                            return e && e.__esModule ? e : { default: e };
                        };
                    Object.defineProperty(r, '__esModule', { value: !0 });
                    var o = n(e('base-x'));
                    r.default = (0, o.default)(
                        '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
                    );
                },
                { 'base-x': 1 }
            ]
        },
        {},
        [2]
    )(2);
});
