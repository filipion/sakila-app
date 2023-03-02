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

        console.log(json, event.target.id)
  
        // await fetch(`/actors/${id}`, {
        //   method: 'PATCH',
        //   headers: {
        //     'content-type': 'application/json' 
        //   },
        //   body: json
        // });
      };

    return (
        <div>
            {
                mode ==! 'edit' 
                ? <div>
                    <div>Name: {props.FirstName}</div>
                    <div>Surname: {props.LastName}</div>
                    <button onClick={() => setMode('edit')}>Edit</button>
                    <button>Delete</button>
                </div>
                : <form onSubmit={updateActor} id={props.id}>
                    <label> Name: </label>
                    <input type="text" name="FirstName" />
                    <br />
                    <label> Surname: </label>
                    <input type="text" name="LastName" />
                    <br />
                    <button type="submit"> Update </button>
                    <button onClick={() => setMode('')}> Cancel </button>
                </form>
            }
            
        </div>
    )
}

export default ActorCard;