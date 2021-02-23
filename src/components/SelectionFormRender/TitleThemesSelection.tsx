import React from 'react'


export interface titleSelection {
    title: String,
}

const TitleThemesSelection: React.FC<titleSelection> = (props) => {

    const {title}= props;
    return(
        <h1 
            style={{
                fontSize:'1.6em',
                fontWeight:'bold',
                textAlign:'center'
            }}
        >
             {title}
        </h1>
            
    );
}

export default TitleThemesSelection;