const fs = require('fs');
const path = require('path');


let query = process.argv.slice(2);


const Organizer = (dir) => {
    if (!fs.existsSync(dir)) return console.log("no Path exist");
    let data = fs.readdirSync(dir);
    let fileType = {
        "images": ["png", "jpg", "jpeg", "gif", "bmp", "tiff", "svg", "ico", "webp", "heic"],
        "media": ["mp4", "mov", "avi", "mkv", "wmv", "flv", "mpg", "mpeg", "webm", "3gp"],
        "documents": ["pdf", "docx", "xlsx", "pptx", "txt", "csv", "rtf", "odt", "ods", "odp", "doc", "xls", "ppt", "html", "xml", "json", "epub", "md", "pages", "numbers", "key"],
        "apk": ["apk", "aab", "xapk", "ipa", "app", "exe", "msi", "dmg", "deb", "rpm"],
        "compressed": ["zip", "rar", "7z", "tar", "gz", "bz2", "xz", "z", "iso"],
        "scripts": ["js"],
        "music": ["mp3", "wav", "flac", "aac", "ogg", "wma", "m4a", "alac", "aiff", "mid"]
    }
    const f = (ext) => {
        for (type in fileType) {
            if (fileType[type].includes(ext)) return type;
        }
        return "other"
    }
    if (!fs.existsSync(path.join(dir, 'organized'))) {
        fs.mkdirSync(path.join(dir, 'organized'));
        fs.mkdirSync(path.join(dir, 'organized', 'images'));
        fs.mkdirSync(path.join(dir, 'organized', 'documents'));
        fs.mkdirSync(path.join(dir, 'organized', 'media'));
        fs.mkdirSync(path.join(dir, 'organized', 'apk'));
        fs.mkdirSync(path.join(dir, 'organized', 'compressed'));
        fs.mkdirSync(path.join(dir, 'organized', 'scripts'));
        fs.mkdirSync(path.join(dir, 'organized', 'music'));
        fs.mkdirSync(path.join(dir, 'organized', 'other'));
        data.forEach(file => {
            if (fs.lstatSync(path.resolve(dir, file)).isFile()) {
                let spath = path.resolve(dir, file);
                let fileExt = path.extname(spath).slice(1);
                let ftype = f(fileExt);
                fs.copyFileSync(spath, path.resolve(dir, "organized", ftype, file));
            }
        })
    }
}

const deepOrganiser = (dir) => {
    console.log("this option is under work");
}
const makeTree = (space, dir) => {
    if (fs.lstatSync(dir).isFile()) {
        console.log(space + " -- " + path.basename(dir));
    }
    else {
        console.log(space + "--" + path.basename(dir));
        let subDir = fs.readdirSync(dir);
        subDir.forEach(ele => {
            let eleDir = path.resolve(dir, ele);
            makeTree(space + "     ", eleDir);
        })
    }
}

if (query[0] == "organizeMe") {
    if (query[1] == "only")
        Organizer(path.resolve());
    else if (query[1] == "deep")
        deepOrganiser(path.resolve())
    else console.log("Run for help");
}
else if (query[0] == "organizePath") {
    let dir = query[2];
    if (query[1] == "only")
        Organizer(dir);
    else if (query[1] == "deep")
        deepOrganiser(dir)
    else console.log("Run for help");
}
else if (query[0] == "tree") {
    if (query[1] == "me")
        makeTree(" ", path.resolve());
    else if (query[1] == "path") {
        if (query[2] != "") {
            let dir = query[2];
            if (!fs.existsSync(dir)) return console.log("no Path exist");
            makeTree("  ", dir);
        }
        else console.log("Enter a path");
    }
    else console.log("Run for help");
}


else if (query[0] == "OrganizeDeepPath") {
    console.log("Under Process");
}
else if (query[0] == 'help') {
    console.log("For organize working folder run 'node index.js organizeMe only")
    console.log("For organize any folder run 'node index.js organizePath only pathofFolder")
    console.log("For tree of working folder run 'node index.js tree me")
    console.log("For tree of any folder run 'node index.js tree path pathofFolder")
}