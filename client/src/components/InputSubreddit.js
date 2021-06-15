import React, {Fragment, useState} from "react"

const InputSubreddit = () => {

    const [subreddit, setSubreddit] = useState("");
    const [threshold, setThreshold] = useState("");

    const onSubmitForm = async(e) =>{
        e.preventDefault();
        try {
            const body = {subreddit,threshold};

            await fetch("http://localhost:5000/api/subreddits", {
                mode: "cors",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }) ;

            window.location = "/";

        } catch (err) {
            console.error(err.message);
        }
    }

    return( 
        <Fragment>
            <div className="container-fluid">
                <div className="row justify-content-md-center text-center">
                    <h1 className="display-1">Spike</h1>
                    
                </div>
                <div className="row justify-content-md-center text-center">

                <h1 className="display-3 mb-0">Who's Where Now?</h1>
                </div>
                <div className="row justify-content-md-center text-center">

                    <h1 className="display-5 mb-5">(Reddit Edition)</h1>
                    </div>

            </div>

            <form className="row g-4 justify-content-md-center mb-5" id="addSubreddit" onSubmit={onSubmitForm}>
                    <div className="col-auto">
                        <input type="text" className="form-control" name="subreddit" placeholder="Subreddit" value={subreddit} onChange={e => setSubreddit(e.target.value)}/>
                    </div>

                    <div className="col-auto">
                        <input type="number" className="form-control" name="threshold" min="0" max="100000000" placeholder="Min Users" value={threshold} onChange={e => setThreshold(e.target.value)}/>
                    </div>

                    <div className="col-auto">
                    <input type="submit" value="Add Subreddit Tracking" className="btn btn-primary mb-3"></input>
                    </div>

                    <div className="col-auto">
                        <button type="reset" className="btn btn-primary mb-3">Clear</button>
                    </div>
            </form>
        </Fragment>
    );
};

export default InputSubreddit;