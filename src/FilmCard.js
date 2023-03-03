import React, {useState} from 'react';

const FilmCard = (props) => {
    const [mode, setMode] = useState('')

    const updateFilm = async event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        var formObj = {};
        formData.forEach((value, key) => formObj[key] = value);
        formObj['FilmId'] = Number(event.target.id)

        // Workaround: these need to be set
        formObj['LanguageId'] = 1
        formObj['OriginalLanguageId'] = 1

        var json = JSON.stringify(formObj);

        await fetch(`/films/${event.target.id}`, {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json' 
          },
          body: json
        });

        setMode('')
        props.refresh()
      };

      const deleteFilm = async event => {
        event.preventDefault();
        console.log(`DELETE /films/${event.target.id}`)
  
        await fetch(`/films/${event.target.id}`, {
          method: 'DELETE'
        });

        setMode('')
        props.refreshAll()
      };

    return (
        <div className="FilmCard">
            {
                mode === 'edit' 
                ? <form onSubmit={updateFilm} id={props.id}>
                    <label> Title: </label>
                    <input type="text" name="Title" defaultValue={String(props.Title)}/>
                    <br />
                    <label> Desc: </label>
                    <input type="text" name="Description" defaultValue={String(props.Description)}/>
                    <br />
                    <button type="submit"> Update </button>
                    <button onClick={() => setMode('')}> Cancel </button>
                </form>
                : <div>
                    <div>Title: {props.Title}</div>
                    <button onClick={() => setMode('edit')}>Edit</button>
                    {props.showDelete && <button id={props.id} onClick={deleteFilm} className="delete_button danger">Delete</button>}
                </div>
            }
            
        </div>
    )
}

export default FilmCard;