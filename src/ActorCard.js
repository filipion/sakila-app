import React, {useState} from 'react';

const ActorCard = (props) => {
    const [mode, setMode] = useState('')

    const updateActor = async event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log(event.target)
        var formObj = {};
        formData.forEach((value, key) => formObj[key] = value);
        formObj['ActorId'] = Number(event.target.id)
        var json = JSON.stringify(formObj);

  
        await fetch(`/actors/${event.target.id}`, {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json' 
          },
          body: json
        });

        setMode('')
        props.refresh()
      };

      const deleteActor = async event => {
        event.preventDefault();
  
        await fetch(`/actors/${event.target.id}`, {
          method: 'DELETE'
        });

        setMode('')
        props.refreshAll()
      };

    return (
        <div>
            {
                mode === 'edit' 
                ? <form onSubmit={updateActor} id={props.id}>
                    <label> Name: </label>
                    <input type="text" name="FirstName" defaultValue={String(props.FirstName)}/>
                    <br />
                    <label> Surname: </label>
                    <input type="text" name="LastName" defaultValue={String(props.LastName)}/>
                    <br />
                    <button type="submit"> Update </button>
                    <button onClick={() => setMode('')}> Cancel </button>
                </form>
                : <div>
                    <div>Name: {props.FirstName}</div>
                    <div>Surname: {props.LastName}</div>
                    <button onClick={() => setMode('edit')}>Edit</button>
                    <button onClick={() => props.refreshAll()}>Delete</button>
                </div>
            }
            
        </div>
    )
}

export default ActorCard;