const ActorForm = () => {
    const handleSubmit = async event => {
      event.preventDefault();
      const formData = new FormData(event.target);
      await fetch('/actors', {
        method: 'POST',
        body: formData
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
