import React, { Component } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

class ManuscriptForm extends Component {
    constructor(props) {
        super(props);

        const rows = 3;
        const columns = 10;
        const totalInputs = rows * columns;
        
        this.state = {
            manuscript:  Array(totalInputs).fill('')
        };
        this.inputRefs = Array(totalInputs + 1).fill(React.createRef());
    }

    handleInputChange = (index, value) => {
        const newManuscript = [...this.state.manuscript];
        newManuscript[index] = value;
        this.setState({ manuscript: newManuscript });
    };

    handleInputKeyDown = (e, index) => {
        if (e.key === 'Spacebar') {
            e.preventDefault();
            if(index < this.state.manuscript.length - 1) {
                this.inputRefs[index + 1].current.focus();
            }
        }
        if (e.key === 'Backspace' && index > 0 && this.state.manuscript[index] === '') {
            this.inputRefs[index - 1].current.focus();
        }
    };


    render() {
        const rows = 3;
        const columns = 10;
        
        return (
        <Container>
            <Typography variant="h5">원고지 양식</Typography>
            <div>
                {Array.from({length: rows}, (_, rowIndex) => (
                    <div key={rowIndex}>
                        {Array.from({length: columns}, (_, colIndex) => {
                            const index = rowIndex * columns + colIndex;
                            return(
                                <TextField
                                    key={index}
                                    inputRef={this.inputRefs[index]}
                                    value={this.state.manuscript[index]}
                                    onChange={e => this.handleInputChange(index, e.target.value)}
                                    onKeyDown={e => this.handleInputKeyDown(e, index)}
                                    variant="outlined"
                                    margin="normal"
                                    size="small"
                                    style={{ width: '2.8rem', margin: '0.1rem 0'}}
                                />
                            )
                        })}
                    </div>
                ))}
            </div>
            <Button 
                variant="contained" 
                color="primary"
            >
            ADD
            </Button>
        </Container>
        );
    }
}

export default ManuscriptForm;
