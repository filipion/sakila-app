import API_ROOT from "./api_root";

const FilmForm = (props) => {
    const handleSubmit = async event => {
      event.preventDefault();
      const formData = new FormData(event.target);
      console.log(event.target)
      var formObj = {};
      formData.forEach((value, key) => formObj[key] = value);

      // Workaround: these need to be set
      formObj['LanguageId'] = 1
      formObj['OriginalLanguageId'] = 1

      var json = JSON.stringify(formObj);
      console.log(json)
      await fetch(`${API_ROOT}/films`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json' 
        },
        body: json
      });

      props.onClose()
    };

    return (
      <div>
      <h2>Add Film</h2>
      <form onSubmit={handleSubmit}>
          <label>
          Title
          <input type="text" name="Title" />
          </label>
          <br />
          <label>
          Description:
          <input type="text" name="Description" />
          </label>
          <br />
          <button type="submit">Submit</button>
          <button onClick={props.onClose}>Cancel</button>
      </form>
      </div>
    );
}

export default FilmForm;
