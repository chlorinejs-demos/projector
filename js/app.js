
;

function count (x) {
    return x['length'];
};
function empty$QUEST$ (s) {
    return (undefined$QUEST$(s) || nil$QUEST$(s) || $EQ$$STAR$({}, s) || $EQ$$STAR$([], s));
};
function not_empty$QUEST$ (s) {
    return !empty$QUEST$(s);
};
function $PLUS$$QUOT$ () {
    var _temp_1000 = Array.prototype.slice.call(arguments), args = _temp_1000.slice(0);
    return reduce(function (x, y) {
            return (x + y);
        }, 0, args);
};
function _$QUOT$ () {
    var _temp_1001 = Array.prototype.slice.call(arguments), args = _temp_1001.slice(0);
    return reduce(function (x, y) {
            return (x - y);
        }, 0, args);
};
function $STAR$$QUOT$ () {
    var _temp_1002 = Array.prototype.slice.call(arguments), args = _temp_1002.slice(0);
    return reduce(function (x, y) {
            return (x * y);
        }, 1, args);
};
function reduce$STAR$ (f, val, coll) {
    for (var i = 0, r = val; true;) {
        if ((i < count(coll))) {
            var _temp_1003 = [(i + 1),f(r, coll[i])];

            i = _temp_1003[0];
            r = _temp_1003[1];
            continue;
        } else {
            return r;
        };
        break;
    };
};
function reduce (f, val, coll) {
    if (fn$QUEST$(Array.prototype.reduce)) {
        return coll.reduce(f, val);
    } else {
        return reduce$STAR$(f, val, coll);
    };
};
function reductions (f, val, coll) {
    var ret = [];
    for (var i = 0, r = val; true;) {
        if ((i < count(coll))) {
            var _temp_1004 = [(i + 1),f((function(){
                ret.push(r);
                return r;})(), coll[i])];

            i = _temp_1004[0];
            r = _temp_1004[1];
            continue;
        } else {
            ret.push(r);
        };
        break;
    };
    return ret;
};
var $STAR$gensym$STAR$ = 999;
function gensym () {
    $STAR$gensym$STAR$ = (1 + $STAR$gensym$STAR$);
    return str("G__", $STAR$gensym$STAR$);
};
function subvec (a, s, e) {
    var e = (e || count(a)), r = new Array();
    return (function () {
        for (var i = (s || 0); true;) {
            if ((i < e)) {
                
                r.push(a[i]);
                var _temp_1005 = [(i + 1)];

                i = _temp_1005[0];
                continue;;
            } else {
                return r;
            };
            break;
        }
    }).call(this);;
};
function map$QUEST$ (m) {
    return (m && !((typeof(m) in {'boolean' : true,'string' : true,'function' : true,'number' : true}) || array$QUEST$(m) || nil$QUEST$(m) || undefined$QUEST$(m) || regexp$QUEST$(m)));
};
function type (x) {
    if (array$QUEST$(x)) {
        return 'array';
    } else {
        if (string$QUEST$(x)) {
            return 'string';
        } else {
            if (number$QUEST$(x)) {
                return 'number';
            } else {
                if (nil$QUEST$(x)) {
                    return "nil";
                } else {
                    if (undefined$QUEST$(x)) {
                        return 'undefined';
                    } else {
                        if (boolean$QUEST$(x)) {
                            return 'boolean';
                        } else {
                            if (fn$QUEST$(x)) {
                                return 'function';
                            } else {
                                if (regexp$QUEST$(x)) {
                                    return 'regexp';
                                } else {
                                    return 'map';
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
function map$STAR$ (fun, arr) {
    for (var r = [], i = 0; true;) {
        if ((i < count(arr))) {
            
            r.push(fun(arr[i]));
            var _temp_1006 = [r,(i + 1)];

            r = _temp_1006[0];
            i = _temp_1006[1];
            continue;;
        } else {
            return r;
        };
        break;
    };
};
function map (f, coll) {
    if (fn$QUEST$(Array.prototype.map)) {
        return coll.map(f);
    } else {
        return map$STAR$(f, coll);
    };
};
function remove (pred, seq) {
    for (var r = [], i = 0; true;) {
        if ((i < count(seq))) {
            
            if (!pred(seq[i])) {
                
                r.push(seq[i]);;
            };
            var _temp_1007 = [r,(1 + i)];

            r = _temp_1007[0];
            i = _temp_1007[1];
            continue;;
        } else {
            return r;
        };
        break;
    };
};
function filter$STAR$ (pred, arr) {
    for (var r = [], i = 0; true;) {
        if ((i < count(arr))) {
            
            if (pred(arr[i])) {
                r.push(arr[i]);
            };
            var _temp_1008 = [r,(i + 1)];

            r = _temp_1008[0];
            i = _temp_1008[1];
            continue;;
        } else {
            return r;
        };
        break;
    };
};
function filter (pred, coll) {
    if (fn$QUEST$(Array.prototype.map)) {
        return coll.filter(pred);
    } else {
        return filter$STAR$(pred, coll);
    };
};
function merge (m1, m2) {
    /* Merge the contents of map `m2' into map `m1' and return a new map. */
    return ((m2 && (function () {
        var m = {};
        for (var k in m1) {
            if (m1.hasOwnProperty(k)) {
                m[k] = m1[k];
            };
        };
        for (var k in m2) {
            if (m2.hasOwnProperty(k)) {
                m[k] = m2[k];
            };
        };
        return m;
     }).call(this)) || m1);
};
function select_keys (m, ks) {
    var m1 = {};
    
    var G__1025 = ks;
    (function () {
        for (var i__1018__auto__ = 0; true;) {
            if ((i__1018__auto__ < count(G__1025))) {
                
                (function () {
                    var k = G__1025[i__1018__auto__];
                    if (m.hasOwnProperty(k)) {
                        m1[k] = m[k];
                    };
                 }).call(this);
                var _temp_1009 = [(i__1018__auto__ + 1)];

                i__1018__auto__ = _temp_1009[0];
                continue;;
            };
            break;
        }
    }).call(this);;
    return m1;;
};
function keys (m) {
    var v = [];
    for (var k in m) {
        if (m.hasOwnProperty(k)) {
            v.push(k);
        };
    };
    return v;;
};
function vals (m) {
    var v = [];
    for (var k in m) {
        if (m.hasOwnProperty(k)) {
            v.push(m[k]);
        };
    };
    return v;;
};
function $EQ$$STAR$ (x, y) {
    if ((x === y)) {
        return true;
    } else {
        if ((type(x) === type(y))) {
            if (array$QUEST$(x)) {
                if ((count(x) === count(y))) {
                    for (var a = x, b = y, c = count(x); true;) {
                        if ((0 === c)) {
                            return true;
                        } else {
                            if ($EQ$$STAR$(first(a), first(b))) {
                                var _temp_1010 = [rest(a),rest(b),dec(c)];

                                a = _temp_1010[0];
                                b = _temp_1010[1];
                                c = _temp_1010[2];
                                continue;
                            } else {
                                return false;
                            };
                        };
                        break;
                    };
                } else {
                    return false;
                };
            } else {
                if (map$QUEST$(x)) {
                    var xkeys = keys(x).sort();
                    if ($EQ$$STAR$(xkeys, keys(y).sort())) {
                        return (function () {
                            for (var ks = xkeys, c = count(xkeys); true;) {
                                if ($EQ$$STAR$(x[first(ks)], y[first(ks)])) {
                                    if ((0 === c)) {
                                        return true;
                                    } else {
                                        var _temp_1011 = [rest(ks),dec(c)];

                                        ks = _temp_1011[0];
                                        c = _temp_1011[1];
                                        continue;
                                    };
                                } else {
                                    return false;
                                };
                                break;
                            }
                        }).call(this);
                    } else {
                        return false;
                    };;
                } else {
                    if ('default') {
                        return false;
                    };
                };
            };
        } else {
            return false;
        };
    };
};
function $EQ$$QUOT$ () {
    var _temp_1012 = Array.prototype.slice.call(arguments), args__961__auto__ = _temp_1012.slice(0);
    this['argnum'] = {};
    (this['argnum'][0] = function () {
        return true;
    })(this['argnum'][1] = function (x) {
        return true;
    },this['argnum'][2] = function (x, y) {
        return $EQ$$STAR$(x, y);
    },this['argnum']['variadic'] = function () {
        var _temp_1013 = Array.prototype.slice.call(arguments), a = _temp_1013[0], b = _temp_1013[1], c = _temp_1013.slice(2);
        return (function () {
            for (var x = a, y = b, more = c; true;) {
                if ($EQ$$STAR$(x, y)) {
                    if (next(more)) {
                        var _temp_1014 = [y,first(more),next(more)];

                        x = _temp_1014[0];
                        y = _temp_1014[1];
                        more = _temp_1014[2];
                        continue;
                    } else {
                        return $EQ$$STAR$(y, first(more));
                    };
                } else {
                    return false;
                };
                break;
            }
        }).call(this);
    });
    var n__962__auto__ = count(args__961__auto__);
    if ((n__962__auto__ in this['argnum'])) {
        return (function () {
            var runner__963__auto__ = this['argnum'][n__962__auto__];
            return runner__963__auto__.apply(runner__963__auto__, args__961__auto__);
         }).call(this);
    } else {
        if (('variadic' in this['argnum'])) {
            return (function () {
                var runner__963__auto__ = this['argnum']['variadic'];
                return runner__963__auto__.apply(runner__963__auto__, args__961__auto__);
             }).call(this);
        } else {
            throw str("Wrong number of args (", n__962__auto__, ") passed to: ", "='");
        };
    };;
};
function identity (x) {
    return x;
};
function reverse (x) {
    return x.slice(0).reverse();
};
function reverse$EXCL$ (x) {
    return x.reverse();
};
function compare (x, y) {
    if ((x === y)) {
        return 0;
    } else {
        if ((x > y)) {
            return 1;
        } else {
            if ((x < y)) {
                return -1;
            };
        };
    };
};
function zero$QUEST$ (x) {
    return (0 === x);
};
function int$STAR$ (x) {
    if (number$QUEST$(x)) {
        return (x | 0);
    };
};
var max = Math.max;
var min = Math.min;
function pos$QUEST$ (x) {
    return (number$QUEST$(x) && (x > 0));
};
function neg$QUEST$ (x) {
    return (number$QUEST$(x) && (x < 0));
};
function rand () {
    var _temp_1015 = Array.prototype.slice.call(arguments), args__961__auto__ = _temp_1015.slice(0);
    this['argnum'] = {};
    (this['argnum'][0] = function () {
        return Math.random();
    })(this['argnum'][1] = function (n) {
        return (n * Math.random());
    });
    var n__962__auto__ = count(args__961__auto__);
    if ((n__962__auto__ in this['argnum'])) {
        return (function () {
            var runner__963__auto__ = this['argnum'][n__962__auto__];
            return runner__963__auto__.apply(runner__963__auto__, args__961__auto__);
         }).call(this);
    } else {
        if (('variadic' in this['argnum'])) {
            return (function () {
                var runner__963__auto__ = this['argnum']['variadic'];
                return runner__963__auto__.apply(runner__963__auto__, args__961__auto__);
             }).call(this);
        } else {
            throw str("Wrong number of args (", n__962__auto__, ") passed to: ", "rand");
        };
    };;
};
function quot (x, y) {
    return int$STAR$((x / y));
};
function integer$QUEST$ (n) {
    return (n === int$STAR$(n));
};
function even$QUEST$ (n) {
    return $EQ$$STAR$(0, (n % 2));
};
function odd$QUEST$ (n) {
    return $EQ$$STAR$(1, (n % 2));
};
function complement (f) {
    return function () {
        var _temp_1016 = Array.prototype.slice.call(arguments), args = _temp_1016.slice(0);
        return !f.apply(f, args);
    };
};
function constantly (x) {
    return function () {
        return x;
    };
};
function peek (x) {
    if (nil$QUEST$(x)) {
        return null;
    } else {
        return x[0];
    };
};
function pop (x) {
    if (nil$QUEST$(x)) {
        return null;
    } else {
        return x.slice(1);
    };
};
function conj () {
    var _temp_1017 = Array.prototype.slice.call(arguments), coll = _temp_1017[0], xs = _temp_1017.slice(1);
    if (empty$QUEST$(coll)) {
        return xs;
    } else {
        var ret = coll.slice(0);
        return ret.concat(xs);;
    };
};
function cons (x, coll) {
    return [x].concat(coll);
};
function dissoc () {
    var _temp_1018 = Array.prototype.slice.call(arguments), m = _temp_1018[0], ks = _temp_1018.slice(1);
    var ret = merge(m, {});
    (function () {
        var m__912__auto__ = ks;
        for (var i__913__auto__ in m__912__auto__) {
            (function () {
                var k = m__912__auto__[i__913__auto__];
                return delete ret[k];
             }).call(this);
        };
     }).call(this);
    return ret;;
};
function find (m, k) {
    if ((k in m)) {
        return [k,m[k]];
    };
};
function every$QUEST$ (pred, coll) {
    if (empty$QUEST$(coll)) {
        return true;
    } else {
        if (pred(first(coll))) {
            return every$QUEST$(pred, next(coll));
        } else {
            return false;
        };
    };
};
function some (pred, coll) {
    if (coll) {
        
        return (pred(first(coll)) || some(pred, next(coll)));;
    };
};
function concat () {
    var _temp_1019 = Array.prototype.slice.call(arguments), args__961__auto__ = _temp_1019.slice(0);
    this['argnum'] = {};
    (this['argnum'][0] = function () {
        return [];
    })(this['argnum'][1] = function (x) {
        return [x];
    },this['argnum'][2] = function (x, y) {
        return x.concat(y);
    },this['argnum']['variadic'] = function () {
        var _temp_1020 = Array.prototype.slice.call(arguments), x = _temp_1020[0], xs = _temp_1020.slice(1);
        return concat(x, concat.apply(concat, xs));
    });
    var n__962__auto__ = count(args__961__auto__);
    if ((n__962__auto__ in this['argnum'])) {
        return (function () {
            var runner__963__auto__ = this['argnum'][n__962__auto__];
            return runner__963__auto__.apply(runner__963__auto__, args__961__auto__);
         }).call(this);
    } else {
        if (('variadic' in this['argnum'])) {
            return (function () {
                var runner__963__auto__ = this['argnum']['variadic'];
                return runner__963__auto__.apply(runner__963__auto__, args__961__auto__);
             }).call(this);
        } else {
            throw str("Wrong number of args (", n__962__auto__, ") passed to: ", "concat");
        };
    };;
};
function mapcat (f, coll) {
    return concat.apply(concat, map(f, coll));
};
function drop (n, coll) {
    if (pos$QUEST$(n)) {
        
        var temp__854__auto__ = coll;
        if (temp__854__auto__) {
            
            return (function () {
                var s = temp__854__auto__;
                return s.slice(n);
             }).call(this);;
        };;;
    };
};
function take (n, coll) {
    if (pos$QUEST$(n)) {
        
        var temp__854__auto__ = coll;
        if (temp__854__auto__) {
            
            return (function () {
                var s = temp__854__auto__;
                return s.slice(0, n);
             }).call(this);;
        };;;
    };
};
function set () {
    var _temp_1021 = Array.prototype.slice.call(arguments), ks = _temp_1021.slice(0);
    var ret = {};
    var m__912__auto__ = ks;
    for (var i__913__auto__ in m__912__auto__) {
        (function () {
            var k = m__912__auto__[i__913__auto__];
            ret[k] = true;
         }).call(this);
    };;
    return ret;
};
function sort () {
    var _temp_1022 = Array.prototype.slice.call(arguments), args__961__auto__ = _temp_1022.slice(0);
    this['argnum'] = {};
    (this['argnum'][1] = function (coll) {
        return Array.prototype.slice.call(coll, 0).sort();
    })(this['argnum'][2] = function (comp, x) {
        return Array.prototype.slice.call(x, 0).sort(comp);
    });
    var n__962__auto__ = count(args__961__auto__);
    if ((n__962__auto__ in this['argnum'])) {
        return (function () {
            var runner__963__auto__ = this['argnum'][n__962__auto__];
            return runner__963__auto__.apply(runner__963__auto__, args__961__auto__);
         }).call(this);
    } else {
        if (('variadic' in this['argnum'])) {
            return (function () {
                var runner__963__auto__ = this['argnum']['variadic'];
                return runner__963__auto__.apply(runner__963__auto__, args__961__auto__);
             }).call(this);
        } else {
            throw str("Wrong number of args (", n__962__auto__, ") passed to: ", "sort");
        };
    };;
};
function take_while (pred, coll) {
    var temp__854__auto__ = coll;
    if (temp__854__auto__) {
        
        return (function () {
            var s = temp__854__auto__;
            if (pred(first(s))) {
                
                return conj(take_while(pred, rest(s)), first(s));;
            };
         }).call(this);;
    };;
};
function drop_last (n, coll) {
    return coll.slice(0, (coll.length - n));
};
function take_last (n, coll) {
    return coll.slice((coll.length - n));
};
function drop_while (pred, coll) {
    [pred,coll];
    var step = function (pred, coll) {
        return (function () {
            var s = coll;
            if ((s && pred(first(s)))) {
                return step(pred, rest(s));
            } else {
                return s;
            };
         }).call(this);
    };
    return step(pred, coll);;
};
function cycle (coll, n) {
    for (var ret = [], n = n; true;) {
        if (zero$QUEST$(n)) {
            return ret;
        } else {
            var _temp_1023 = [ret.concat(coll),dec(n)];

            ret = _temp_1023[0];
            n = _temp_1023[1];
            continue;
        };
        break;
    };
};
function split_at (n, coll) {
    return [take(n, coll),drop(n, coll)];
};
function repeat (n, x) {
    for (var ret = [], n = n; true;) {
        if (zero$QUEST$(n)) {
            return ret;
        } else {
            var _temp_1024 = [conj(ret, x),dec(n)];

            ret = _temp_1024[0];
            n = _temp_1024[1];
            continue;
        };
        break;
    };
};
function iterate (f, x, n) {
    var ret = [];
    return cons(x, (function () {
            for (var v = x, i = dec(n); true;) {
                if (zero$QUEST$(i)) {
                    return ret;
                } else {
                    var _temp_1025 = [(function () {
                        var val = f(v);
                        ret.push(val);
                        return val;
                     }).call(this),dec(i)];

                    v = _temp_1025[0];
                    i = _temp_1025[1];
                    continue;
                };
                break;
            }
        }).call(this));
};
function split_with (pred, coll) {
    return [take_while(pred, coll),drop_while(pred, coll)];
};
function zipmap (keys, vals) {
    var map = {};
    for (var ks = keys, vs = vals; true;) {
        if ((ks && vs)) {
            
            map[first(ks)] = first(vs);
            var _temp_1026 = [next(ks),next(vs)];

            ks = _temp_1026[0];
            vs = _temp_1026[1];
            continue;;
        } else {
            return map;
        };
        break;
    };
};
function nthnext (coll, n) {
    for (var n = n, xs = coll; true;) {
        if ((xs && pos$QUEST$(n))) {
            var _temp_1027 = [dec(n),next(xs)];

            n = _temp_1027[0];
            xs = _temp_1027[1];
            continue;
        } else {
            return xs;
        };
        break;
    };
};
function nthrest (coll, n) {
    for (var n = n, xs = coll; true;) {
        if ((xs && pos$QUEST$(n))) {
            var _temp_1028 = [dec(n),rest(xs)];

            n = _temp_1028[0];
            xs = _temp_1028[1];
            continue;
        } else {
            return xs;
        };
        break;
    };
};
function rand_int (n) {
    return int$STAR$(rand(n));
};
function rand_nth (coll) {
    return coll[rand_int(count(coll))];
};
function range$STAR$ (start, end, step) {
    var ret = [], comp = (pos$QUEST$(step) ? function (p1__1026$HASH$, p2__1027$HASH$) {
        return (p1__1026$HASH$ < p2__1027$HASH$);
    } : function (p1__1028$HASH$, p2__1029$HASH$) {
        return (p1__1028$HASH$ > p2__1029$HASH$);
    });
    return (function () {
        for (var i = start; true;) {
            if (comp(i, end)) {
                
                ret.push(i);
                var _temp_1029 = [(i + step)];

                i = _temp_1029[0];
                continue;;
            } else {
                if (comp(i, end)) {
                    return cons(ret, range$STAR$(i, end, step));
                } else {
                    return ret;
                };
            };
            break;
        }
    }).call(this);;
};
function range () {
    var _temp_1030 = Array.prototype.slice.call(arguments), args__961__auto__ = _temp_1030.slice(0);
    this['argnum'] = {};
    (this['argnum'][1] = function (end) {
        return range$STAR$(0, end, 1);
    })(this['argnum'][2] = function (start, end) {
        return range$STAR$(start, end, 1);
    },this['argnum'][3] = function (start, end, step) {
        return range$STAR$(start, end, step);
    });
    var n__962__auto__ = count(args__961__auto__);
    if ((n__962__auto__ in this['argnum'])) {
        return (function () {
            var runner__963__auto__ = this['argnum'][n__962__auto__];
            return runner__963__auto__.apply(runner__963__auto__, args__961__auto__);
         }).call(this);
    } else {
        if (('variadic' in this['argnum'])) {
            return (function () {
                var runner__963__auto__ = this['argnum']['variadic'];
                return runner__963__auto__.apply(runner__963__auto__, args__961__auto__);
             }).call(this);
        } else {
            throw str("Wrong number of args (", n__962__auto__, ") passed to: ", "range");
        };
    };;
};
function partition (n, step, coll) {
    var temp__854__auto__ = coll;
    if (temp__854__auto__) {
        
        return (function () {
            var s = temp__854__auto__;
            return (function () {
                var temp__854__auto__ = take(n, s);
                if (temp__854__auto__) {
                    
                    return (function () {
                        var p = temp__854__auto__;
                        if ($EQ$$STAR$(n, count(p))) {
                            return cons(p, partition(n, step, nthrest(s, step)));
                        } else {
                            return [];
                        };
                     }).call(this);;
                };
             }).call(this);
         }).call(this);;
    };;
};
function true$QUEST$ (expr) {
    return (true === expr);
};
function false$QUEST$ (expr) {
    return (false === expr);
};
function undefined$QUEST$ (expr) {
    return (undefined === expr);
};
function nil$QUEST$ (expr) {
    return (null === expr);
};
function first (x) {
    return x[0];
};
function second (x) {
    return x[1];
};
function third (x) {
    return x[2];
};
function last (x) {
    return x[(count(x) - 1)];
};
function next (x) {
    if (empty$QUEST$(x)) {
        return null;
    } else {
        if ((1 < count(x))) {
            return x.slice(1);
        };
    };
};
function rest (x) {
    if (nil$QUEST$(x)) {
        return [];
    } else {
        return x.slice(1);
    };
};
function array$QUEST$ (a) {
    return (a instanceof Array);
};
function string$QUEST$ (s) {
    return ("string" === typeof(s));
};
function number$QUEST$ (n) {
    return ("number" === typeof(n));
};
function boolean$QUEST$ (b) {
    return ("boolean" === typeof(b));
};
function fn$QUEST$ (f) {
    return ("function" === typeof(f));
};
function regexp$QUEST$ (re) {
    return (re instanceof RegExp);
};
function inc (arg) {
    return (1 + arg);
};
function dec (arg) {
    return (arg - 1);
};;
angular.module("myApp", ["myApp.services"]);

var servicesModule = angular.module("myApp.services", []);
servicesModule.factory("Storage", function () {
        var newServiceInstance = {};
        newServiceInstance.loadObject = function (key) {
            var data = [];
            var json_object = localStorage[key];
            if (json_object) {
                data = JSON.parse(json_object);
            };
            return data;
        };
        newServiceInstance.clear = function () {
            return localStorage.clear();
        };
        newServiceInstance.supported = function () {
            return (("localStorage" in window) && (window['localStorage'] !== null));
        };
        newServiceInstance.saveObject = function (objectToSave, key) {
            localStorage[key] = JSON.stringify(objectToSave);
        };
        return newServiceInstance;
    });;

projectorCtrl = function ($scope, Storage) {
    $scope['startBalance'] = Storage.loadObject("startBalance");
    $scope['expenses'] = Storage.loadObject("expenses");
    $scope['incomes'] = Storage.loadObject("incomes");
    $scope['nonRecurring'] = Storage.loadObject("nonRecurring");
    $scope['storageSupport'] = Storage.supported();
    $scope.save = function () {
        Storage.saveObject($scope['expenses'], "expenses");
        Storage.saveObject($scope['incomes'], "incomes");
        Storage.saveObject($scope['startBalance'], "startBalance");
        return Storage.saveObject($scope['nonRecurring'], "nonRecurring");
    };
    $scope.clear = function () {
        Storage.clear();
        $scope['startBalance'] = [];
        $scope['expenses'] = [];
        $scope['incomes'] = [];
        $scope['nonRecurring'] = [];
        return $scope.initForm();
    };
    $scope.addExpense = function () {
        var newEmptyExpense = {'frequency' : 1,'amount' : 0,'name' : "",'active' : true};
        return $scope['expenses'].push(newEmptyExpense);
    };
    $scope.removeExpense = function (index) {
        return $scope['expenses'].splice(index, 1);
    };
    $scope.addIncome = function () {
        var newEmptyIncome = {'frequency' : 1,'amount' : 0,'name' : "",'active' : true};
        return $scope['incomes'].push(newEmptyIncome);
    };
    $scope.removeIncome = function (index) {
        return $scope['incomes'].splice(index, 1);
    };
    $scope.addTransaction = function () {
        var newEmptyTransaction = {'month' : 1,'amount' : 0,'name' : "",'active' : true};
        return $scope['nonRecurring'].push(newEmptyTransaction);
    };
    $scope.removeTransaction = function (index) {
        return $scope['nonRecurring'].splice(index, 1);
    };
    $scope.tallyTransactions = function () {
        var total = 0;
        var oneOff = 0;
        for (var m = 0;(m < count($scope.nonRecurring));m++) {
            
            oneOff = $scope.convertToNumber($scope.nonRecurring[m]['amount']);
            if ((oneOff !== 0)) {
                if ($scope.nonRecurring[m]['active']) {
                    total = (total + oneOff);
                };
            };;
        };
        return total;
    };
    $scope.monthlyIncome = function () {
        var total = 0;
        var thisMonth = null;
        for (var i = 0;(i < count($scope.incomes));i++) {
            thisMonth = $scope.convertToNumber($scope.incomes[i]['amount']);
            if ((thisMonth !== 0)) {
                if ($scope.incomes[i]['active']) {
                    total = (total + (thisMonth * $scope.incomes[i]['frequency']));
                };
            };
        };
        return total;
    };
    $scope.monthlyExpense = function () {
        var total = 0;
        var thisMonth = null;
        for (var i = 0;(i < count($scope.expenses));i++) {
            
            thisMonth = $scope.convertToNumber($scope.expenses[i]['amount']);
            if ((thisMonth !== 0)) {
                if (('i' in $scope['expenses'] ? $scope['expenses'][i] : 'active')) {
                    total = (total + (thisMonth * $scope.expenses[i]['frequency']));
                };
            };;
        };
        return total;
    };
    $scope.monthlyNet = function () {
        
        var income = $scope.monthlyIncome();
        var expense = $scope.monthlyExpense();
        return (income - expense);;
    };
    $scope.montlyProjection = function () {
        var monthByMonth = [];
        var runningTotal = 0;
        var oneOff = 0;
        for (var i = 0;(i < 12);i++) {
            
            runningTotal = (runningTotal + $scope.monthlyNet());
            for (var m = 0;(m < count($scope.nonRecurring));m++) {
                if (($scope.convertToNumber($scope.nonRecurring[m]['month']) == (i + 1))) {
                    
                    oneOff = $scope.convertToNumber($scope.nonRecurring[m]['amount']);
                    if ((oneOff !== 0)) {
                        if ($scope.nonRecurring[m]['active']) {
                            runningTotal = (runningTotal + oneOff);
                        };
                    };;
                };
            };
            monthByMonth[i] = runningTotal;;
        };
        return monthByMonth;
    };
    $scope.getMonthLabel = function (monthAhead) {
        var d = new Date();
        var currentMonth = d.getMonth();
        var year = d.getFullYear();
        var monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var futureMonth = (currentMonth + monthAhead);
        if ((futureMonth > 11)) {
            
            futureMonth = (futureMonth - 12);
            year = (year + 1);;
        };
        return (monthNames[futureMonth] + " " + year);
    };
    $scope['positiveNegative'] = function (value) {
        if ((value > 0)) {
            "positive";
        };
        if ((value < 0)) {
            return "negative";
        };
    };
    $scope.convertToNumber = function (value) {
        var floatNumber = parseFloat(value);
        if (floatNumber) {
            return floatNumber;
        } else {
            return 0;
        };
    };
    $scope.roundDown = function (number) {
        return Math.round(number);
    };
    $scope.initForm = function () {
        if ((count($scope.incomes) < 1)) {
            $scope.addIncome();
        };
        if ((count($scope.expenses) < 1)) {
            $scope.addExpense();
        };
        if ((count($scope.nonRecurring) < 1)) {
            return $scope.addTransaction();
        };
    };
    return $scope.initForm();
};;