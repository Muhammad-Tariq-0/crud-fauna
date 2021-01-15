
import React,{useEffect,useState} from 'react';
import { Formik } from 'formik';

export default function Home() {
    const [loading, setloading] = useState(false);
    const [deleting, setdeleting] = useState(false);
    const [updating, setupdating] = useState(false);

//---------------Getting Data------------------------------

    const [mydata, setData] = useState([]);
    useEffect(() => {
        console.log("useEffect Called");
        fetch(`/.netlify/functions/readall`)
          .then(response => response.json())
          .then(data => {
            setData(data);
            console.log("Data: " + JSON.stringify(data));       
          });
      }, [loading,deleting,updating]);

//--------------Delete Data-------------------------

async function deleteTodo(e) {
    console.log("delete funtion Called successfully");
    console.log(e.ref["@ref"].id );
    setdeleting(true);
       await fetch(`/.netlify/functions/delete`, {
            method: 'post',
            body: JSON.stringify({ id: e.ref["@ref"].id })
        })    
    setdeleting(false);              
}


//--------------update Data-------------------------

async function updateTodo(e) {
    console.log("update funtion Called successfully");
    const input = prompt("Enter new value");
    // console.log(e.ref["@ref"].id );
      setupdating(true);
       await fetch(`/.netlify/functions/update`, {
            method: 'post',
            body: JSON.stringify({ id: e.ref["@ref"].id, message:input })
        })     
      setupdating(false);         
}


    return <div>
        <h1>Anywhere in your app!</h1>

        {/* ----------------Send Data -------------------- */}

        <Formik
            initialValues={{ message: '' }}
            validate={values => {
                const errors = {};
                if (!values.message) {
                    errors.message = 'Required';
                }
                return errors;
            }}
            onSubmit={(values) => {
                console.log(values);
                setloading(true);
                fetch(`/.netlify/functions/create`, {
                    method: 'post',
                    body: JSON.stringify(values)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);

                    });
                    setloading(false);
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                /* and other goodies */
            }) => (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="message"
                            onChange={handleChange}
                            value={values.message}
                        />
                        {errors.message && touched.message && errors.message}
                        <button type="submit">
                            Add Message
                        </button>
                    </form>
                )}
        </Formik>
        <h1>-----------------------------</h1>
        <>{mydata.map((e)=>{
            const id = e.ref["@ref"].id;
            console.log(id);
            return(
                <div>
                    <h1>{e.data.title}
                    <button onClick={()=> {deleteTodo(e)}}>X</button>
                    <button onClick={()=> {updateTodo(e)}}>update</button>
                    </h1>
                </div>
            )
        })}</>
    </div>
}

