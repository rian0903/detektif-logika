const emojis = ["🍎", "🍌", "🍇", "🍉", "🍒", "🍓", "🥝", "🍍", "🥥", "🥑", "🍆", "🥕", "🌽", "🌶️", "🥦", "🍄", "🥜", "🍞", "🥐", "🥖", "🥨", "🥯", "🥞", "🧀", "🍖", "🍗", "🥩", "🥓", "🍔", "🍟", "🍕", "🌭", "🥪", "🌮", "🌯", "🥙", "🥚", "🍳", "🥘", "🍲", "🥣", "🥗", "🍿", "🧂", "🥫", "🍱", "🍘", "🍙", "🍚", "🍛", "🍜", "🍝", "🍠", "🍢", "🍣", "🍤", "🍥", "🥮", "🍡", "🥟", "🥠", "🥡", "🦀", "🦞", "🦐", "🦑", "🍦", "🍧", "🍨", "🍩", "🍪", "🎂", "🍰", "🧁", "🥧", "🍫", "🍬", "🍭", "🍮", "🍯", "🍼", "🥛", "☕", "🍵", "🍶", "🍾", "🍷", "🍸", "🍹", "🍺", "🍻", "🥂", "🥃", "🥤", "🧃", "🧉", "🧊", "🥢", "🍽️", "🍴", "🥄", "🔪", "🏺", "🦁", "🐯", "🐴", "🦄", "🦓", "🦌", "🐮", "🐷", "🐗", "🐏", "🐑", "🐐", "🐪", "🐫", "🦙", "🦒", "🐘", "🦏", "🦛", "🐭", " (mouse)", "🐀", "🐹", "🐰", "🐿️", "🦔", "🦇", "🐻", "🐨", "🐼", "🦥", "🦦", "🦨", "🦘", "🦡", "🐾", "🦃", "🐔", "🐓", "🐣", "🐤", "🐥", "🐦", "🐧", "🕊️", "🦅", "🦆", "🦢", "🦉", "🦩", "🦚", "🦜", "🐸", "🐊", "🐢", "🦎", "🐍", "🐲", "🐉", "🦕", "🦖", "🐳", "🐋", "🐬", "🐟", "🐠", "🐡", "🦈", "🐙", "🐚", "🐌", "🦋", "🐛", "🐜", "🐝", "🐞", "🦗", "🕷️", "🕸️", "🦂", "🦟", "🦠", "💐", "🌸", "💮", "�️", "�", "🥀", "�", "�", "🌼", "�", "🌱", "�", "�", "�", "🌵", "🌾", "🌿", "☘️", "🍀", "🍁", "🍂", "🍃", "🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒", "🚐", "🚚", "🚛", "🚜", "🛴", "🚲", "🛵", "🏍️", "🛺", "🚨", "🚔", "🚍", "🚘", "🚖", "🚡", "🚠", "�", "�", "🚋", "🚞", "🚝", "🚄", "🚅", "🚈", "🚂", "�", "🚇", "�", "�", "🚁", "🛩️", "✈️", "🛫", "🛬", "🛰️", "🚀", "🛸", "🛶", "⛵", "🛥️", "🚤", "⛴️", "🛳️", "🚢", "⚓", "🚧", "⛽", "🚏", "🚦", "🚥", "🛑", "🎡", "🎢", "🎠", "🏗️", "🌁", "🗼", "🏭", "⛲", "🎑", "⛰️", "🏔️", "🗻", "🌋", "🗾", "🏕️", "⛺", "🏞️", "🛣️", "🛤️", "🌅", "🌄", "🏜️", "🏖️", "🏝️", "🌇", "🌆", "🏙️", "�", "🌉", "🌌", "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "🥲", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥸", "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "�", "�", "�", "�", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "�", "😐", "�", "�", "�", "😯", "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "�", "�", "🤐", "🥴", "🤢", "🤮", "🤧", "�", "🤒", "🤕", "🤑", "🤠", "�", "👿", "�", "👺", "🤡", "�", "�", "�", "☠️", "👽", "👾", "🤖", "🎃", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾"];
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = (array) => array.sort(() => Math.random() - 0.5);

const generateNumberSequence = () => {
    const type = randomInt(1, 3); // 1: Add, 2: Subtract, 3: Multiply (small)
    let start = randomInt(1, 20);
    let step = randomInt(1, 5);
    if (type === 3) {
        start = randomInt(1, 3);
        step = 2; // Keep multiply simple x2
    }

    const sequence = [];
    for (let i = 0; i < 4; i++) {
        if (type === 1) sequence.push(start + (i * step));
        else if (type === 2) sequence.push(start + 20 - (i * step)); // Start higher so no negative
        else if (type === 3) sequence.push(start * Math.pow(step, i));
    }

    let nextVal;
    if (type === 1) nextVal = sequence[3] + step;
    else if (type === 2) nextVal = sequence[3] - step;
    else if (type === 3) nextVal = sequence[3] * step;

    // Generate options
    const options = [nextVal];
    while (options.length < 3) {
        let fake = nextVal + randomInt(-5, 5);
        if (fake !== nextVal && !options.includes(fake) && fake >= 0) options.push(fake);
    }

    return {
        sequence: sequence,
        answer: nextVal,
        options: shuffle(options)
    };
};

const generatePattern = (pool) => {
    const patternType = randomInt(1, 2); // 1: ABAB, 2: ABCABC
    const a = pickRandom(pool);
    let b = pickRandom(pool);
    while (a === b) b = pickRandom(pool);

    let sequence = [];
    let answer;
    let options = [];

    if (patternType === 1) {
        // ABAB
        sequence = [a, b, a, b];
        answer = a;
        options = [a, b, pickRandom(pool)];
    } else {
        // ABC (A,B,C,A,B, ?)
        let c = pickRandom(pool);
        while (c === a || c === b) c = pickRandom(pool);
        sequence = [a, b, c, a, b];
        answer = c;
        options = [a, b, c];
    }

    // Ensure options are unique
    options = [...new Set(options)];
    while (options.length < 3) {
        let fake = pickRandom(pool);
        if (!options.includes(fake)) options.push(fake);
    }

    return {
        sequence: sequence,
        answer: answer,
        options: shuffle(options)
    };
};

export const generateLevels = (count = 100) => {
    const generatedLevels = [];
    for (let i = 1; i <= count; i++) {
        const type = Math.random();
        let levelData;

        if (type < 0.33) {
            // Number Pattern
            levelData = generateNumberSequence();
        } else if (type < 0.66) {
            // Emoji Pattern
            levelData = generatePattern(emojis);
        } else {
            // Letter Pattern
            levelData = generatePattern(letters);
        }

        generatedLevels.push({
            id: i,
            sequence: levelData.sequence,
            answer: levelData.answer,
            options: levelData.options
        });
    }
    return generatedLevels;
};

export const levels = generateLevels(10); // Default fallback

