export default function CreateProduct(){
    return(
        <div className="container my-4">
            <div className="row">
                <div className="col-md-8 mx-auto rounded border p-4"></div>
                <h2 className="text-center mb-5">Create Product</h2>

                <form>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label">Name</label>
                        <div className="col-sm-8">
                            <input className="form-control" name="name"/>
                            <span className="text-danger"></span>
                        </div>
                    </div>


                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label">Brand</label>
                        <div className="col-sm-8">
                            <input className="form-control" name="name"/>
                            <span className="text-danger"></span>
                        </div>
                    </div>


                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label">Catogory</label>
                        <div className="col-sm-8">
                            <select className="form-select" nname="Catogory">
                                <option value='Other'>Other</option>
                                <option value='Other'>Mobile</option>
                                <option value='Other'>Laptop</option>
                                <option value='Other'>Makeup</option>
                                <option value='Other'>Clothes</option>

                            </select>
                            <span className="text-danger"></span>
                        </div>
                    </div>


                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label">Price</label>
                        <div className="col-sm-8">
                            <input className="form-control" nname="price" type="number" step="0.01" min="1"/>
                           
                            
                            <span className="text-danger"></span>
                        </div>
                    </div>


                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label">Description</label>
                        <div className="col-sm-8">
                            <textarea className="form-control" name="description" rows="4"/>
                            
                            <span className="text-danger"></span>
                        </div>
                    </div>











                </form>
            </div>
        </div>

    );
}