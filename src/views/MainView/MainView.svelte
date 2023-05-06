<script>
    import { db } from '$lib/firebaseConfig';
    import { collection, onSnapshot } from 'firebase/firestore';

    // Component imports
    import TodoForm from "../../components/TodoForm/TodoForm.svelte";
    import Task from '../../components/Task/Task.svelte';

    let tasks = [];

    const collectionRef = collection( db, 'tasks' );
    const unsubscribe = onSnapshot( collectionRef, ( querySnapshot ) => {
        let tempTasks = [];
        querySnapshot.forEach( doc => {
            tempTasks.push({ ...doc.data(), id: doc.id });
        });

        tasks = [...tempTasks];
    });

    $: console.table( tasks );
</script>

<main>
    <TodoForm />

        
    {#each tasks as task, index}
        <Task 
            description ={ task.description } 
            status      ={ task.status } />
    {/each} 
        
</main>