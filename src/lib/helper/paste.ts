import type { FileUpload, Game } from '$lib/types/VPin';

export const getClipboardText = (event: ClipboardEvent) => {
    return event.clipboardData?.getData('Text');
}

const parseJSON = (text: string) => {
    try {
        return JSON.parse(text);
    } catch (error) {
        return null;
    }
}

export const pasteNewFileAuthors = (files: FileUpload[]) => {
    navigator.clipboard.readText().then((clipText) => {

    })
}

// TODO this should return something that looks like a Table
// TODO this should take an optional event
const jsonPreamble = (event: ClipboardEvent): any => {
    const clipText = getClipboardText(event);
    if (!clipText) {
        return null;
    }

    const json = parseJSON(clipText);
    if (json == null) {
        return null;
    }

    const date = new Date(json.dateModified || json.dateCreated);
    if (date.getFullYear() < 1990) {
        return null;
    }

    json.date = date.getTime();

    event.preventDefault();
    event.stopPropagation();

    return json;
}

// paste JSON into a version field and update the version and createdAt
export const pasteVersion = <T extends FileUpload>(file: T, event: ClipboardEvent): T => {
    const json = jsonPreamble(event);
    if (!json) { return file; }

    return {
        ...file,
        version: json.softwareVersion,
        createdAt: json.date,
        updatedAt: new Date().getTime(),
    };
}

export const pasteFeatures = <T extends FileUpload>(file: T, event: ClipboardEvent): T => {
    const json = jsonPreamble(event);
    if (!json) { return file; }

    return {
        ...file,
        version: json.softwareVersion,
        createdAt: json.date,
        updatedAt: new Date().getTime(),
    };
}

export const pasteAuthors = <T extends FileUpload>(file: T, event: ClipboardEvent): T => {
    const json = jsonPreamble(event);
    if (!json) { return file; }

    return {
        ...file,
        version: json.softwareVersion,
        createdAt: json.date,
        updatedAt: new Date().getTime(),
    };
}

export const pasteURL = <T extends FileUpload>(file: T, event: ClipboardEvent): T => {
    const json = jsonPreamble(event);
    if (!json) { return file; }

    return {
        ...file,
        version: json.softwareVersion,
        createdAt: json.date,
        updatedAt: new Date().getTime(),
    };
}


/*

pasteNew(files, key)

pasteUpdate(file)

- json only?

pasteField(file, key)


when matching authors: search for author name and only accept if found


json

Table:

parse json
otherId - copy

Backglass:

parse json
tableId - copy authors
otherId - copy

ROM:

rom name - find rom, copy
gameId - copy players, copy roms
otherId - find Game, copy roms

Others

parse json
otherId - copy

*/

/*
AddButton

    if (!files) files = [];

    // TODO dkoski -- paste
    navigator.clipboard.readText().then(
        (clipText) => {
            const json = JSON.parse(clipText);

            const date = new Date(json.dateModified || json.dateCreated);

            //@ts-ignore
            files.push({
                id: nanoid(10),
                version: json.softwareVersion,
                createdAt: date.getTime(),
                updatedAt: date.getTime(),
                authors: [json.author.name],
                urls: [{ url: json.url }]
            });
            files = files;
            open = true;

        }
    )

    ROM

        const pasteRom = (event: ClipboardEvent) => {
            const id = getClipboardText(event);
            const rom = id && DB.findRom(id);
            if (rom) {
                event.preventDefault();
                event.stopPropagation();
                copyRom(rom, file);
            }
        };
    

    */