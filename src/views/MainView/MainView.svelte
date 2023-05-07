<script>
    import { db } from '$lib/firebaseConfig';
    import { collection, onSnapshot } from 'firebase/firestore';

    // Component imports
    import TodoForm from "../../components/TodoForm/TodoForm.svelte";
    import Task from '../../components/Task/Task.svelte';

    // Ionic components
    import 'ionic-svelte/components/ion-grid';
    import 'ionic-svelte/components/ion-col';
    import 'ionic-svelte/components/ion-row';
    import 'ionic-svelte/components/ion-modal';
    import 'ionic-svelte/components/ion-header';
    import 'ionic-svelte/components/ion-content';

    let tasks = [];
    let isOpen = false;

    const collectionRef = collection( db, 'tasks' );
    const unsubscribe = onSnapshot( collectionRef, ( querySnapshot ) => {
        let tempTasks = [];
        querySnapshot.forEach( doc => {
            tempTasks.push({ ...doc.data(), id: doc.id });
        });

        tasks = [...tempTasks];
    });

    const showModal = () => {
        let currentValueIsOpen = !isOpen;
        isOpen = currentValueIsOpen;
    }

    $: console.table( tasks );
</script>

<ion-grid>
    <ion-row>
        <ion-col>
            <TodoForm />
        </ion-col>
    </ion-row>

    <ion-row>
        <ion-col>
            {#each tasks as task, index}
                <Task 
                    showModal   ={ showModal }
                    id          ={ task.id }
                    description ={ task.description } 
                    status      ={ task.status } />
            {/each} 
        </ion-col>
    </ion-row>
</ion-grid>

{#if isOpen }
    <ion-modal>
        <ion-header>
            <h1>Sample Modal</h1>
        </ion-header>
    </ion-modal>
{/if}
