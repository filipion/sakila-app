const ActorForm = () => {
    const handleSubmit = async event => {
      event.preventDefault();
      const formData = new FormData(event.target);
      console.log(event.target)
      var formObj = {};
      formData.forEach((value, key) => formObj[key] = value);
      var json = JSON.stringify(formObj);

      await fetch(`/actors`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json' 
        },
        body: json
      });
    };

    return (
      <div>
      <h2>Add Actor</h2>
      <form onSubmit={handleSubmit}>
          <label>
          First Name:
          <input type="text" name="FirstName" />
          </label>
          <br />
          <label>
          Last Name:
          <input type="text" name="LastName" />
          </label>
          <br />
          <button type="submit">Submit</button>
      </form>
      </div>
    );
}

export default ActorForm;
