import sdk,{ VM } from "@stackblitz/sdk";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

const vmcontext = createContext<VM | null>(null);
const EMBED_ID= 'my-stackblitz-embed';
const PROJECT_ID = 'js-9bpfzi';

export const VMProvider = ({ children }: PropsWithChildren) => {
  const [vm, setVm] = useState<VM>(null!);
  useEffect(() =>{
    sdk.embedProjectId(EMBED_ID, PROJECT_ID,{
        forceEmbedLayout: true,
        openFile: 'index.js',
        view: 'editor',
        hideNavigation: true,
        // hideExplorer: true,
        height: '500',
        
    }).then(vm=>{
        setVm(vm);
        console.log(vm);
        
    });
  },[])
  return <vmcontext.Provider value={vm}>{children}</vmcontext.Provider>;
};

export const useVm = () => useContext(vmcontext);
