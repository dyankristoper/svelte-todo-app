<script>
    
    import axios from 'axios';
    import * as dotenv from 'dotenv';
    dotenv.config();

    let newTaskDescription = '';

    /** 
        @description    Send POST request to Firebase
                        Adds a new task with Pending Status
    */
    const onSubmitHandler = ( e ) => {
        e.preventDefault();

        let newTask = {
            name: newTaskDescription,
            status: 'Pending'
        };

        axios.post( process.env.FIREBASE_URL , newTask )
            .then( response => console.log( response ) )
            .catch( e => console.error( e ))
        // Clear new task value
        newTask = '';
    }

</script>


<form on:submit={ onSubmitHandler }>
    <input
        type ='text'
        value={ newTaskDescription }
    >
    <input
        type='submit'
        value='+ Add Task'
    >
</form>