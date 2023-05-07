<script>
    // Ionic components
	import 'ionic-svelte/components/ion-button';
	import 'ionic-svelte/components/ion-card';
	import 'ionic-svelte/components/ion-card-header';
	import 'ionic-svelte/components/ion-content';

    // Firestore
    import { db } from '$lib/firebaseConfig';
    import { collection, deleteDoc, doc } from 'firebase/firestore';
    const collectionRef = collection( db, 'tasks' );

    // Get props here
    export let description;
    export let status;
    export let id;

    // Delete current task identified by props: id
    const onDeleteTaskHandler = () => {
        console.log('On delete task');
        const taskDoc = doc(db, 'tasks', id);
        
        const deleteTask = async () => {
            await deleteDoc( taskDoc );
        }

        deleteTask();
    }

</script>

<ion-card>
    <ion-card-header>
        <ion-card-title>{ description }</ion-card-title>
    </ion-card-header>
    <ion-card-content>
        {#if status === 'pending' }
            <ion-button size='small'>Mark as Done</ion-button>
        {/if}
        <ion-button 
            size='small' 
            color='danger'
            on:click={onDeleteTaskHandler}
            >Delete</ion-button>
    </ion-card-content>
</ion-card>



