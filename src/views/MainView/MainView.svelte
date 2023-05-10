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
    import 'ionic-svelte/components/ion-item';
    import 'ionic-svelte/components/ion-label';
    import 'ionic-svelte/components/ion-input';

    // Utility functions
    import { sortTaskByStatus, sortByCreatedDate } from '../../utils/sort.svelte';

    let tasks = [];
    let isOpen = false;
    let currentTaskDescription = '';
    let curretTaskId = null;

    const collectionRef = collection( db, 'tasks' );

    /** 
        @description    Fetch current documents from collection , tasks                  
    */
    const unsubscribe = onSnapshot( collectionRef, ( querySnapshot ) => {
        let tempTasks = [];
        querySnapshot.forEach( doc => {
            tempTasks.push({ ...doc.data(), id: doc.id });
        });
        tempTasks.sort( sortByCreatedDate );
        tasks = [...tempTasks.sort(sortTaskByStatus)];
    });

    /** 
        @description    Changes isOpen variable
                        Shows modal to update task
    */
    const showModal = ( description, id ) => {
        let currentValueIsOpen = !isOpen;

        isOpen = currentValueIsOpen;

        // Set value for Update task
        currentTaskDescription = description;
        curretTaskId = id;
    }

    /** 
        @description    Use Firebase doc to update selected task description
    */
    const onUpdateDescriptionHandler = () => {
        const currentDoc = doc(db, 'tasks', curretTaskId);
        const updateDescription = async () => {
            await setDoc( currentDoc, { description: currentTaskDescription }, { merge: true });
        }
        
        updateDescription();
        resetValues();
    }

    /** 
        @description    Set variable values to default
    */
    const resetValues = () => {
        isOpen = false;
        currentTaskDescription = '';
        curretTaskId = null;
    }

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
    <ion-content>
        <ion-grid>
            <ion-row>
                <ion-header>
                    <h2>Update Task</h2>
                </ion-header>
            </ion-row>

            <ion-row>
                <ion-col>
                    <ion-item>
                        <ion-label position="stacked">Task Description:</ion-label>
                        <input 
                            type ="text"
                            class='input_modal'
                            bind:value = { currentTaskDescription }
                            >
                    </ion-item>
                </ion-col>
            </ion-row>

            <ion-row>
                <ion-col>
                    <ion-button 
                        color='primary'
                        expand='full'
                        on:click={onUpdateDescriptionHandler} >
                        Update
                    </ion-button>
                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-content>
</ion-modal>

<style>

.input_modal{
    outline: none;
    border: none;
    background-color: transparent;
}

ion-modal {
    --height: 20%;
    --width: 30%;
    --border-radius: 8px;
    --box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

ion-modal::part(backdrop) {
    background: rgba(209, 213, 219);
    opacity: 1;
}

</style>

