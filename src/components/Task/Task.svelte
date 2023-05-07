<script>
    // Ionic components
	import 'ionic-svelte/components/ion-button';
	import 'ionic-svelte/components/ion-card';
	import 'ionic-svelte/components/ion-card-header';
	import 'ionic-svelte/components/ion-content';

    // Firestore
    import { db } from '$lib/firebaseConfig';
    import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
    const collectionRef = collection( db, 'tasks' );

    // Get props here
    export let description;
    export let status;
    export let id;
    export let showModal;

    const taskDoc = doc(db, 'tasks', id);

    // Delete current task identified by props: id
    const onDeleteTaskHandler = () => {        
        const deleteTask = async () => {
            await deleteDoc( taskDoc );
        }

        deleteTask();
    }

    const onMarkAsDoneHandler = () => {
        const markAsDone = async () => {
            await setDoc( taskDoc, { status: 'Done' }, { merge: true })
        }

        markAsDone();
    }

</script>

<ion-card>
    <ion-card-header>
        <ion-card-title class='{ status === 'Done' ? 'slashed-task' :'' }'>{ description }</ion-card-title>
    </ion-card-header>
    <ion-card-content>
        {#if status === 'pending' }
            <ion-button 
                size='small'
                on:click={ onMarkAsDoneHandler }
                >Mark as Done</ion-button>
        {/if}
        <ion-button 
            size='small' 
            color='secondary'
            on:click={ showModal(description, id) }
            >Update</ion-button>
        <ion-button 
            size='small' 
            color='danger'
            on:click={onDeleteTaskHandler}
            >Delete</ion-button>
    </ion-card-content>
</ion-card>

<style>
.slashed-task{
    text-decoration: line-through;
}
</style>



