import classes from './NewPost.module.css';
import Modal from '../components/Modal'
import { Link, Form, redirect } from 'react-router-dom';

function NewPost() {
  return (
    <Modal>
    <Form method='post' className={classes.form}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea id="body" name="body" required rows={3} 
        />
      </p>
      <p>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" name="author" required 
        />
      </p>
      <p className={classes.actions}>
        <Link type="button" to='..'>Cancel</Link>
        <button >submit</button> 
        {/* HTML에서 <button> 요소는 기본적으로 폼 안에 있을 때 타입이 지정되지 않으면 자동으로 submit 버튼으로 동작합니다. */}
      </p>
    </Form>
    </Modal>
  );
}

export default NewPost;

export async function action({request}) {
    const formData = await request.formData();
    const postData =  Object.fromEntries(formData); // { body: '...', author: '...' }
    await fetch('http://localhost:8080/posts', {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return redirect('/');
}