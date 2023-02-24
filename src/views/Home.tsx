import React, { useContext, useEffect, useState } from "react";
import sdk, { VM } from '@stackblitz/sdk';
import { Button, Text, Card, Grid, Col, Group,Alert } from "@mantine/core";
import { useVm } from "../shared/VmContext";


const HomeView: React.FC = () => {
    const EMBED_ID= 'my-stackblitz-embed';
    const PROJECT_ID = 'js-9bpfzi';
    const vm = useVm();
    const description = 'Dans cet exercice, vous allez devoir implémenter une fonction qui prend en entrée un tableau d\'entiers non trié, et qui renvoie ce même tableau trié par ordre croissant Pour cela, vous pouvez utiliser l\'algorithme de tri à bulles, qui consiste à parcourir le tableau plusieurs fois en comparant les éléments voisins et en les échangeant si nécessaire. Vous pouvez également utiliser d\'autres algorithmes de tri si vous les connaissez.';
    const name = 'Exercice 1';
    const [result, setResult] = useState<JSX.Element | null>(null);
    const [error, setError] = useState<number | null>(null);

    function resultMessageTemplate(message: string, error: number ) {
        console.log(error);
        console.log(message);
        
        const colorResponse = error != 200 ? 'red' : 'green';
        const titleResponse = error != 200 ? 'Erreur' : 'Bravo';
        return (
            <Alert style={{marginBottom : "12px"}} title={titleResponse} color={colorResponse}>
                {message}
            </Alert>
        )
    }
    
    async function start() {
      // Embeds a project and keeps track of the VM
        if(vm){
            // await vm.applyFsDiff({
            //     create:{
            //         'test.js': `console.log('hello world')`,
            //     },
            //     destroy: [],
            // })
            const fichier = await vm?.getFsSnapshot()
            //console.log(fichier);
            for (const path in fichier) {
                console.log(path);
                console.log(fichier[path]);
                if(path == 'index.js'){
                    const file = fichier[path];
                    // Traitement du fichier/dossier
                    fetch('http://localhost:3001/exercices/1/correction', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({code: file})
                    }).then(res => {
                        // setError(res.status);
                        // console.log('status : '+res.status);
                        // console.log('data : '+res.json());
                        
                        return res.json();
                    }


                    ).then(data => {
                        console.log(data);
                        setResult(resultMessageTemplate(data.message, data.status));
                    }).catch(err => {
                        console.log('error' +err);
                    }
                    )

                }
            }
        }
    }
    

        
        useEffect(() => {
            //embedInstance(EMBED_ID,PROJECT_ID);
            //start();


            
        }, [error])
        

    return (
            <Card shadow="sm">
                {result}
                <div style={{display: "flex",height: "500px"}} >
                    <div style={{flex:1, display: "flex", flexDirection: "column"}}>
                        <Text weight={500} size="lg">
                            {name}
                        </Text>
                        <Text style={{flex: 1}} mt="sm">{description}</Text>
                        <Button onClick={start} color="blue" fullWidth>
                            Valider l'exercice
                        </Button>
                    </div>
                    <div style={{flex:2}}>
                        <div id="my-stackblitz-embed" ></div>
                    </div>
                </div>
            </Card>
    )
}

export default HomeView;