<script>
    import { db } from '$lib/firebaseConfig';
    import { collection, onSnapshot, setDoc, doc } from 'firebase/firestore';

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
    let currentTaskDescription = '';
    let curretTaskId = null;

    const collectionRef = collection( db, 'tasks' );
    const unsubscribe = onSnapshot( collectionRef, ( querySnapshot ) => {
        let tempTasks = [];
        querySnapshot.forEach( doc => {
            tempTasks.push({ ...doc.data(), id: doc.id });
        });

        tasks = [...tempTasks];
    });

    const showModal = ( description, id ) => {
        let currentValueIsOpen = !isOpen;

        isOpen = currentValueIsOpen;

        // Set value for Update task
        currentTaskDescription = description;
        curretTaskId = id;

        console.log({ currentTaskDescription, curretTaskId });
    }

    const onUpdateDescriptionHandler = () => {
        console.log( curretTaskId );
        const currentDoc = doc(db, 'tasks', curretTaskId);
        const updateDescription = async () => {
            await setDoc( currentDoc, { description: currentTaskDescription }, { merge: true });
        }
        
        updateDescription();
        resetValues();
    }

    const resetValues = () => {
        isOpen = false;
        currentTaskDescription = '';
        curretTaskId = null;
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


<ion-modal is-open={ isOpen } on:close={ () => isOpen = false }>
    <ion-header>
        <h1>Update Task</h1>
    </ion-header>
    <ion-content>
        <input 
            type="text"
            bind:value = { currentTaskDescription }
            >
        <ion-button 
            color='primary'
            on:click={onUpdateDescriptionHandler} >
            Update
        </ion-button>
    </ion-content>
</ion-modal>

