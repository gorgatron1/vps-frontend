<script lang="ts">
	import type { FileUpload } from '$lib/types/VPin';
	import { faAdd } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { nanoid } from 'nanoid';

	export let files: FileUpload[] | undefined;
	export let title = '???';
	export let open = false;
</script>

<button
class="btn variant-ghost-tertiary self-end gap-4"
on:click={() => {
    if (!files) files = [];
    //@ts-ignore
    files.push({
        id: nanoid(10),
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
    });
    files = files;
    open = true;
}}><Fa icon={faAdd} /> Add new {title}</button
>

<button
class="btn variant-ghost-tertiary self-end gap-4"
on:click={() => {
    if (!files) files = [];

    // TODO dkoski -- clipboard
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
}}><Fa icon={faAdd} /> New from paste</button
>
