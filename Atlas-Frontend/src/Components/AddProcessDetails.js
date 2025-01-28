import React from "react";
import AddCutting from "./AddProcesses/AddCutting";
import AddKachian from "./AddProcesses/AddKachian";
import AddKachiPress from "./AddProcesses/AddKachiPress";
import AddKachiWash from "./AddProcesses/AddKachiWash";
import AddKaj from "./AddProcesses/AddKaj";
import AddLinking from "./AddProcesses/AddLinking";
import AddOverlock from "./AddProcesses/AddOverlock";
import AddPakkiPress from "./AddProcesses/AddPakkiPress";
import AddPakkiWash from "./AddProcesses/AddPakkiWash";
import AddRaffu from "./AddProcesses/AddRaffu";
import AddSewing from "./AddProcesses/AddRaffu";
import AddTailoring from "./AddProcesses/AddTailoring";
import AddThokeTanke from "./AddProcesses/AddThokeTanke";

const AddProcessDetails = ({ RSN }) => {

    return(
        <div>
            <h2>Add details of other processes.</h2>
            <AddCutting RSN={RSN}/>
            <AddKachiPress RSN={RSN}/>
            <AddPakkiPress RSN={RSN}/>
            <AddKachian RSN={RSN}/>
            <AddKaj RSN={RSN}/>
            <AddLinking RSN={RSN}/>
            <AddOverlock RSN={RSN}/>
            <AddRaffu RSN={RSN}/>
            <AddSewing RSN={RSN}/>
            <AddTailoring RSN={RSN}/>
            <AddThokeTanke RSN={RSN}/>
            <AddKachiWash RSN={RSN}/>
            <AddPakkiWash RSN={RSN}/>
        </div>
    );
};

export default AddProcessDetails;
