const
    ABC = 'abcdefghijklmnopqrstuvwxyzäıöüŋğşçñ',
    VOWELS = 'aeiouäıöü',
    BACK_VOWELS = 'aıou',
    FRONT_VOWELS = 'äeiöü',
    CONSONANTS = 'bcdfghjklmnpqrstvwyzŋğşçñ',
    a = {
        'дж': 'c',
        'къ': 'q',
        'нг': 'ñ',
        'дз': 'z',
        'гъ': 'ğ',
        'оь': 'ö',
        'уь': 'ü',
        'аь': 'ä',
        'нъ': 'ñ',
        'дь': 'j',
        'нь': 'ñ', /* Crime, Siberian Turkc*/
        'ә': 'ä',
        'ӑ': 'ä',
        'ə': 'ä',
        'â': 'ä',
        'ê': 'ä',
        'і': 'i',
        'ө': 'ö',
        'ӗ': 'e',
        'é': 'e',
        'ұ': 'u',
        'ү': 'ü',
        'ӳ': 'ü',
        'ў': 'ü',
        'ӱ': 'ü',
        'ң': 'ñ',
        'ҥ': 'ñ',
        'ғ': 'ğ',
        'ґ': 'ğ',
        'ҕ': 'ğ',
        'қ': 'q',
        'ҡ': 'q',
        'ҳ': 'q',
        'һ': 'q',
        'h': 'q',
        'x': 'q',
        'ï': 'и',
        'w': 'у',
        'ҙ': 'z',
        'ҫ': 'ç',
        'ӌ': 'ç',
        'җ': 'c',
        'tengri': 'teñri',
        'tenri': 'teñri',
        'ё': 'yo',
        'й': 'y',
        'ц': 's', /*'у':'u',*/
        'к': 'k',
        'е': 'e',
        'н': 'n',
        'г': 'g',
        'ш': 'ş',
        'щ': 'şş',
        'з': 'z',
        'х': 'q',
        'ъ': '',
        'ф': 'p',
        'ы': 'ı',
        'в': 'v',
        'а': 'a',
        'п': 'p',
        'р': 'r',
        'о': 'o',
        'л': 'l',
        'д': 'd',
        'ж': 'j',
        'я': 'ya',
        'ч': 'ç',
        'с': 's',
        'м': 'm', /*'и':'i' */
        'т': 't',
        'ь': '',
        'б': 'b',
        'ю': 'yу'
    },

    VOWELS_BITIG = ['𐰀', '𐰀', '𐰃', '𐰆', '𐰆', '𐰅', '𐰃', '𐰇', '𐰇'],
    CONSONANTS_BITIG = ['𐰉', '𐰲', '𐰑', '𐰯', '𐰏', '𐰴', '𐰖', '𐰚', '𐰞', '𐰢', '𐰣', '𐰯', '𐰴', '𐰺', '𐰽', '𐱃', '𐰉', '𐰉', '𐰖', '𐰔', '𐰭', '𐰍', '𐱁', '𐰲', '𐰭'],
    FRONT_BITIG = ['𐰋', '𐰓', '𐰏', '𐰚', '𐱅', '𐰠', '𐰤', '𐰼', '𐰾', '𐰘', '𐰢', '𐰯', '𐰭', '𐰭', '𐰔', '𐱁', '𐰲', '𐰘', '𐰲', '𐰋'],

    BACK_LATIN = 'bdğqtlnrsympñŋzşçjcwgk',
    FRONT_LATIN = 'bdgktlnrsympñŋzşçjcw',
    BACK_BITIG_Q = ['𐰉', '𐰑', '𐰍', '𐰴', '𐱃', '𐰞', '𐰣', '𐰺', '𐰽', '𐰖', '𐰢', '𐰯', '𐰭', '𐰭', '𐰔', '𐱁', '𐰲', '𐰖', '𐰲', '𐰉', '𐰍', '𐰴'],
    BACK_BITIG_K = ['𐰉', '𐰑', '𐰍', '𐰴', '𐱃', '𐰞', '𐰣', '𐰺', '𐰽', '𐰖', '𐰢', '𐰯', '𐰭', '𐰭', '𐰔', '𐱁', '𐰲', '𐰖', '𐰲', '𐰉', '𐰏', '𐰚'],

    UK = '𐰜', OQ = '𐰸', QI = '𐰶', NT = '𐰦', LT = '𐰡', NC = '𐰨', NY = '𐰪', VI = '𐰃', VO = '𐰆', VU = '𐰇', // const ic = '𐰱',
    CRI = 'и', CRW = 'у',

    REGEX = /[^aeiouäıöü]*[aeiouäıöü]+(?:[^aeiouäıöü]*$|[^aeiouäıöü](?=[^aeiouäıöü]))?/gi,
    REGEXTNK = /k|n|g|ş|t|b|e|ä/,
    REGEXTNKW = /k|g/,
    REGEXVOWEL = /a|e|i|o|u|ä|ı|ö|ü/;

var itoiy = false, first_ae = false, enisey_a = true, nosingk = true, funcs = false, convert_method = 'over';
var word_length;

// Converter
function syllabify(word) {
    var s = '';
    let m;
    while ((m = REGEX.exec(word)) !== null) {
        if (m.index === REGEX.lastIndex) {
            REGEX.lastIndex++;
        } // This is necessary to avoid infinite loops with zero-width matches
        m.forEach((match, groupIndex) => {     // The result can be accessed through the `m`-variable.
            s += (s !== '' ? ' ' : '') + match;  // console.log(`Found match, group ${groupIndex}: ${match}`);
        });
    }
    return s;
}

String.prototype.toEniseyAE = function (check) {
    return check ? this : this.replaceAll('ä', 'е');
};

String.prototype.replaceAll = function (search, replacement) {
    return this.replace(new RegExp(search, 'g'), replacement);
};

String.prototype.diphthongToLetter = function (check) {
    if (check) {
        var text = diphthongI(this);
        text = diphthongW(text);
        return text;
    }
    return this.replaceAll(CRI, 'i')
                .replaceAll(CRW, 'u');
};

String.prototype.removePunctuations = function (check) {
    if (!check) return this;

    var res = '';
    this.split('').map(function (char) {
        var c = a[char] || char;
        if (ABC.indexOf(c) !== -1 || c === '\n' || c === CRI || c === CRW) {
            // if (Character.isLetterOrDigit(c) || c.equals('\n')) {
            res += c;
        } else {
            res += ' ' + c + ' ';
        }
    });
    return res;
};

/*
* step #2
*/
function normalize(word) {
    return word
        .replaceAll('I', 'ı').replaceAll('İ', 'i')  /* Turkish extra ordinaries */
        .toLowerCase()
        .split('').map(function (char) {
            return a[char] || char;
        }).join('')
        .toEniseyAE(enisey_a)
        .removePunctuations(true)
        .replaceAll('\n', ' Z ')
        .trim()
        .replaceAll('\\s{2,}', ' ')
        .split(' ');
}

/*
* step #1
*/
function toBitig(input) {
    var words = normalize(input);
    var sentence = '', last = '';
    words.forEach((word, index) => {
        word = word.diphthongToLetter(itoiy);

        var add;
        if (!funcs) {
            add = ((sentence === '' || last === '\n' || word === 'Z' || last === ' : ' || last === ' ' || last === '   ' || last === '') ? '' : ' : ') +
                (word === 'Z' ? '\n'
                    : ((word.length == 1 && ABC.indexOf(word.charAt(0)) === -1 && word !== 'Z') ? ''
                        : wordToBitig(word)));
        } else {
            var funs = '.,:؛؟)}]>»?;،.!';
            add = ((sentence === '' || last === '\n' || funs.indexOf(last) !== -1) ? '' : ' ')
                +
                ((word.length == 1 && ABC.indexOf(word.charAt(0)) === -1 && word !== 'Z') ? (word === '?' ? '؟' : (word === ',' ? '،' : (word === ';' ? '؛' : word + (word.indexOf('?') !== -1 ? ' ' : ''))))
                    : (word === 'Z' ? '\n' : wordToBitig(word)));
        }
        sentence += add;
        last = (word === 'Z' ? '\n' : add);
    });
    return sentence;
}

function diphthongI(word) {  // change cyrillic И to iy or ıy  (for Kazak abc)
    //console.log('И word: ', word);
    if (word === CRI) return 'iy'; // if word is only И letter
    if (word.length === 2 || (word.length === 3 && CONSONANTS.indexOf(word.charAt(2)) !== -1)) { // 2 letter or (3 letter and last is consonants)
        return word.replaceAll(CRI, (word.match(REGEXTNK) ? 'iy' : 'ıy'));
    } else {
        var new_word = '';
        for (var i = 0; i < word.length; i++) {
            var c = word.charAt(i);
            if (c !== CRI) {  // if current letter is not И
                new_word += c;
            } else {    // current letter is И
                new_word += (word.charAt(i < 2 ? i : i - 1).match(REGEXTNK) ? 'iy' : 'ıy');
            }
        }
        return new_word;
    }
}

function diphthongW(word) {
    if (word === CRW) return 'ub';
    if (word.length === 2) {
        /* v[w] */
        if (VOWELS.indexOf(word.charAt(0)) !== -1) return word.replaceAll(CRW, 'b');
        /* [w]v */
        if (VOWELS.indexOf(word.charAt(1)) !== -1) return word.replaceAll(CRW, (FRONT_VOWELS.indexOf(word.charAt(1)) !== -1 ? 'üb' : 'ub'));
        /* [w]c OR c[w] */
        return word.replaceAll(CRW, (word.match(REGEXTNK) ? 'üb' : 'ub'));
    }
    var new_word = '';
    for (var i = 0; i < word.length; i++) {
        var c = word.charAt(i);
        if (c != CRW) {
            new_word += c;
        } else {
            if (i === 0) {
                new_word += ((FRONT_VOWELS.indexOf(word.charAt(1)) !== -1 || word.charAt(1).match(REGEXTNKW)) ? 'üw' : 'uw');
            } else if (i === 1) {
                new_word += (VOWELS.indexOf(word.charAt(0)) !== -1 ? 'w' :
                    (word.charAt(0).match(REGEXTNKW) ? 'üw' : 'uw'));
            } else {
                new_word += (VOWELS.indexOf(word.charAt(i - 1)) !== -1 ? 'w' :
                    (word.charAt(i - 1).match(REGEXTNK) ? 'iw' : 'ıw'));
            }
        }
    }
    return new_word || word;
}

function getCons(c, v) {
    if (BACK_VOWELS.indexOf(v) !== -1) {
        return BACK_LATIN.indexOf(c) !== -1 && nosingk ? BACK_BITIG_Q[BACK_LATIN.indexOf(c)] : CONSONANTS_BITIG[CONSONANTS.indexOf(c)];
    } else if (FRONT_VOWELS.indexOf(v) !== -1) {
        return FRONT_LATIN.indexOf(c) !== -1 ? FRONT_BITIG[FRONT_LATIN.indexOf(c)] : CONSONANTS_BITIG[CONSONANTS.indexOf(c)];
    }
    return c;
}

function getCC(c) {
    switch (c) {
        case 'nt':
        case 'nd':
            return NT;
        case 'lt':
        case 'ld':
            return LT;
        case 'ny':
            return NY;
        case 'nç':
        case 'nş':
            return NC;
        default:
            return '';
    }
}

function getAE(v, bool) {
    return (v === 'a' || v === 'e') && bool ? '' : VOWELS_BITIG[VOWELS.indexOf(v)];
}

function wordToBitig(word) {
    //console.log('\nWORD: |', word);
    var bitig_word = '';
    var syll = '';
    word_length = word.length;
    if (word.match(REGEXVOWEL) && word.length > 1) {
        var divided = syllabify(word).split(' ');
        var last_c = ' ';
        // var i = 0;
        divided.forEach((tmp, i) => {
            var syll_length = tmp.length;
            var c0 = tmp.charAt(0);
            var c1 = syll_length > 1 ? tmp.charAt(1) : ' ';
            var c2 = syll_length > 2 ? tmp.charAt(2) : ' ';
            var c3 = syll_length > 3 ? tmp.charAt(3) : ' ';

            var is_last = (i === divided.length - 1);
            var is_first = (i === 0);

            // console.log('current syllabic: |',i, is_first, is_last, tmp);

            switch (syll_length) {
                case 1:
                    if (ABC.indexOf(c0) !== -1) {
                        syll = CONSONANTS.indexOf(c0) !== -1 ? getCons(c0, 'a') : (VOWELS.indexOf(c0) !== -1 ? getAE(c0, (!first_ae && i === 0)) : c0);
                    } else {
                        syll = c0;
                    }
                    break;
                case 2:
                    syll = syll2(c0, c1, is_first, is_last, true);
                    break;
                case 3:
                    syll = syll3(c0, c1, c2, is_first, is_last);
                    break;
                case 4:
                    syll = syll4(c0, c1, c2, c3, is_first, is_last);
                    break;
                default:
                    syll += c0 + c1 + c2 + c3;
                    break;
            }

            if (i > 1 && (('uqu oqo oqu uqo'.indexOf(tmp) !== -1 && last_c === 'q') || ('quq qoq'.indexOf(tmp) !== -1 && 'ou'.indexOf(last_c) !== -1)
                || (nosingk && (('uku oko oku uko'.indexOf(tmp) !== -1 && is_last_c === 'k') || ('kuk kok'.indexOf(tmp) !== -1 && 'ou'.indexOf(last_c) !== -1))))) {
                bitig_word = bitig_word.substring(0, bitig_word.length - 2) + OQ + syll.substring(2, syll.length);
            } else if (getCC(last_c + c0) !== '') {
                bitig_word = bitig_word.substring(0, bitig_word.length - 2) + getCC(last_c + c0) + syll.substring(2, syll.length);
            } else {
                bitig_word += syll;
            }
            last_c = tmp.charAt(syll_length - 1);
        });
    } else {
        for (var i = 0; i < word.length; i++) {
            var c = word.charAt(i);
            if (CONSONANTS.indexOf(c) !== -1) {
                syll += CONSONANTS_BITIG[CONSONANTS.indexOf(c)];
            } else if (VOWELS.indexOf(c) !== -1) {
                syll += VOWELS_BITIG[VOWELS.indexOf(c)];
            } else {
                syll += c;
            }
        }
        bitig_word += syll;
    }

    if (convert_method !== 'no') bitig_word = getHarmony(bitig_word);
    return bitig_word;
}

function getHarmony(word) {
    var ret = '';
    if (convert_method === 'over' || convert_method === 'lib') {
        var o = VO + VU;
        var ii = VI;
        var pre = '';
        for (var i = 0; i < word.length - 1; i += 2) {
            var c = word.substring(i, i + 2);
            if (pre === '' || i === word.length - 2) {
                pre = (o + ii).indexOf(c) !== -1 ? c : '';
                ret += c;
            } else if (o.indexOf(pre) !== -1 && o.indexOf(c) !== -1) {
                ret += '';
                pre = o.indexOf(c) !== -1 ? c : '';
            } else {
                if (convert_method === 'over' && (o + ii).indexOf(pre) !== -1 && (o + ii).indexOf(c) !== -1) {
                    ret += '';
                    pre = ((o + ii).indexOf(c) !== -1 ? c : '');
                } else {
                    ret += c;
                }
            }
        }
    }
    return ret;
}

function syll2(c0, c1, first, last, setv) {
    var bitig_syll = '';
    // if (last && !first){
    if (!first) {
        bitig_syll = VC(c0, c1, last);
    } else {
        if (VOWELS.indexOf(c1) !== -1) { //cv
            if (nosingk && c0 === 'k' && BACK_VOWELS.indexOf(c1) !== -1) {
                c0 = 'q';
            }
            if ((first || last) && word_length !== 2 && c0 === 'q' && c1 === 'ı') {
                bitig_syll = QI + getAE(c1, !last);
            } else if ((first || last) && word_length !== 2 && c0 === 'q' && (c1 === 'u' || c1 === 'o')) {
                bitig_syll = OQ + getAE(c1, !last);
            } else {
                bitig_syll = getCons(c0, c1) + getAE(c1, !last);
            }
        } else {// vc
            if (nosingk && c1 === 'k' && BACK_VOWELS.indexOf(c0) !== -1) {
                c1 = 'q';
            }
            if ((first || last) && c0 == 'ı' && c1 == 'q') {
                bitig_syll = QI;// + getCons(c1, c0);
            } else if ((first || last) && (c0 == 'o' || c0 == 'u') && c1 == 'q') {
                bitig_syll = OQ;// + getCons(c1, c0);
            } else {
                bitig_syll = getAE(c0, !first_ae && first && setv) + getCons(c1, c0);
            }
        }
    }
    return bitig_syll;
}

function syll3(c0, c1, c2, first, last) {
    var bitig_syll = '';
    if (VOWELS.indexOf(c1) !== -1) {
        // cvc
        if (nosingk) {
            if (c0 === 'k' && BACK_VOWELS.indexOf(c1) !== -1) {
                c0 = 'q';
            }
            if (c2 === 'k' && BACK_VOWELS.indexOf(c1) !== -1) {
                c2 = 'q';
            }
        }
        if (c0 === 'k' && (c1 === 'ö' || c1 === 'ü')) {
            bitig_syll = UK + (first ? VU : '') + getCons(c2, c1);
        } else if (first && c0 === 'q' && c1 === 'ı') {
            bitig_syll = QI + VI + getCons(c2, c1);
        } else if (c1 === 'ı' && c2 === 'q') {
            bitig_syll = getCons(c0, c1) + QI;
        } else if (first && c0 === 'q' && (c1 === 'o' || c1 === 'u')) {
            bitig_syll = OQ + VO + getCons(c2, c1);
        } else if ((c1 === 'o' || c1 === 'u') && c2 === 'q') {
            bitig_syll = getCons(c0, c1) + OQ;
        } else {
            bitig_syll = getCons(c0, c1) + ((c1 === 'a' || c1 === 'e') ? getCons(c2, c1) : VC(c1, c2, last));//syll2(c1, c2, false, true, true);
        }
    } else if (VOWELS.indexOf(c0) !== -1) {
        // vcc
        bitig_syll = getAE(c0, (last && !first_ae) || !last) + doubleCons(c0, c1, c2);
    }
    return bitig_syll;
}

function syll4(c0, c1, c2, c3, first, last) {
    var bitig_syll;
    if (VOWELS.indexOf(c1) !== -1) { // cvcc
        bitig_syll = doubleCons(c1, c2, c3);
        return getCons(c0, c1) + getAE(c1, true) + bitig_syll;
    } else { //ccvc
        bitig_syll = doubleCons(c2, c0, c1);
        return bitig_syll + syll2(c2, c3, false, last, false);
    }
}

function doubleCons(v, c0, c1) {
    switch (c0 + c1) {
        case 'nt':
        case 'nd':
            return NT;
        case 'lt':
        case 'ld':
            return LT;
        case 'ny':
            return NY;
        case 'nç':
            return NC;
        default:
            return (getCons(c0, v) + getCons(c1, v));
    }
}

function VC(c0, c1, last) {
    var bitig_syll = '';
    var vc = c0 + c1;
    switch (vc) {
        case 'oq':
        case 'uq':
            bitig_syll = OQ;
            break;
        case 'qo':
        case 'qu':
            bitig_syll = OQ + '𐰆';
            break;
        case 'ök':
        case 'ük':
            bitig_syll = UK;
            break;
        case 'kü':
        case 'kö':
            bitig_syll = UK + (last ? '' : VU);
            break;
        case 'qı':
            bitig_syll = QI;
            break;
        case 'ıq':
            bitig_syll = QI + VI;
            break;
        default:
            if (VOWELS.indexOf(c1) !== -1) { // cv
                bitig_syll = getCons(c0, c1) + getAE(c1, !last);
            } else // vc
                bitig_syll = getAE(c0, last) + getCons(c1, c0);
            break;
    }
    return bitig_syll;
}

// Controller
$(document).ready(function () {
    $(".btn-clear").click(function () {
        $(".text-original").val("");
        $(".text-convert").val("");
    });

    $(".text-original").on('change keyup paste', function () {
        var text = $(this).val();
        $(".text-convert").val(toBitig(text));
    });

    $(".func-letter-a").on('change', function () {
        first_ae = !first_ae;
        stateChange();
    });
    $(".func-letter-en").on('change', function () {
        enisey_a = !enisey_a;
        stateChange();
    });
    $(".func-letter-k").on('change', function () {
        nosingk = !nosingk;
        stateChange();
    });
    $(".func-letter-i").on('change', function () {
        itoiy = !itoiy;
        stateChange();
    });
    $(".func-marks").on('change', function () {
        funcs = !funcs;
        stateChange();
    });
    $(".method-selection").on('change', function () {
        convert_method = $(this).val();
        stateChange();
    });

    function stateChange() {
        var text = $('.text-original').val();
        $(".text-convert").val(toBitig(text));
    }
});