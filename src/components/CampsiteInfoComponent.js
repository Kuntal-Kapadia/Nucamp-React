import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label,  Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values) {
        console.log("Current state is: " + JSON.stringify(values));
        alert("Current state is: " + JSON.stringify(values));
    }
    
render(){

    return(
        <div>
            <Button type="submit" onClick={this.toggleModal} outline color="secondary"><i class="fa fa-pencil" aria-hidden="true"></i> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <Row className="form-group mx-1">
                                <Label htmlFor="Rating" >Rating</Label>
                                <Control.select model=".rating" id = "rating" name="rating" placeholder="rating"
                                        className="form-control">
                                        <option value="" selected disabled>Choose Rating</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                </Control.select>
                            </Row>
                            <Row className="form-group mx-1">
                                <Label htmlFor="testname" >Your Name</Label>
                                    <Control.text model=".testname" id="testname" name="testname"
                                        placeholder="Name"
                                        className="form-control"
                                        validators={{
                                            required, 
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                     <Errors
                                        className="text-danger"
                                        model=".testname"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                            </Row>

                            <Row className="form-group mx-1">
                                <Label htmlFor="Comments" >Comments</Label>
                                    <Control.textarea model=".testcomment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control"
                                    />
                            </Row>
                            <Row className ="mx-1"> 
                            <Button type="submit" color="primary">Submit</Button>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
        </div>
    );
    }
}

function RenderCampsite({campsite}){
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments}) {
    return(
        <div className="col-md-5 m-1">
            <h4>Comments</h4>
            {comments.map(comment=>
                    <div key={comment.id}>
                        <p>{comment.text}<br></br>
                        --{comment.author},{" "}
                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </div>     
                )
            }
            <CommentForm />
        </div>
    );   
}

function CampsiteInfo(props){
        if(props.campsite){
            return(
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
                );
        }
        else return <div />;

}

export default CampsiteInfo;