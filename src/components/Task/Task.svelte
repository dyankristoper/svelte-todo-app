<script>
    // Ionic components
	import 'ionic-svelte/components/ion-button';
	import 'ionic-svelte/components/ion-card';
	import 'ionic-svelte/components/ion-card-header';
	import 'ionic-svelte/components/ion-content';

    // Firestore
    import { db } from '$lib/firebaseConfig';
    import { deleteDoc, doc, setDoc } from 'firebase/firestore';

    // Get props here
    export let description;
    export let status;
    export let id;
    export let showModal;

    // Delete current task identified by props: id
    const onDeleteTaskHandler = ( event ) => {        
        const deleteTask = async () => {
            await deleteDoc( doc(db, 'tasks', id) );
        }

        deleteTask();
    }

    const onMarkAsDoneHandler = () => {
        const markAsDone = async () => {
            await setDoc( doc(db, 'tasks', id), { status: 'Done' }, { merge: true })
        }

        markAsDone();
    }

</script>

<ion-card>
    <ion-card-header>
        <ion-card-title class='{ status === 'Done' ? 'task__slashed' :'' }'>{ description }</ion-card-title>
    </ion-card-header>
    <ion-card-content>
        {#if status === 'pending' }
            <ion-button 
                size='small'
                on:click={ onMarkAsDoneHandler }
                >Mark as Done</ion-button>
            <ion-button 
                size='small' 
                color='secondary'
                on:click={ showModal(description, id) }
                >Update</ion-button>
        {/if}
        <ion-button 
            size='small' 
            color='danger'
            on:click={onDeleteTaskHandler}
            >Delete</ion-button>
    </ion-card-content>
</ion-card>

<style>
.task__slashed{
    text-decoration: line-through;
}
</style>



