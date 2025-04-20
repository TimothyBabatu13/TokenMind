
import type { ToolInvocation as ToolInvocationTypee  } from 'ai'

interface ToolInvocationType {
    tool: ToolInvocationTypee
}

export const ToolInvocation = ({ tool } : ToolInvocationType)=>{
console.log(tool)
    return(
        <div>
        </div>
    )
}

