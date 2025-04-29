import ReactMarkDown from 'react-markdown';
        

const KnowledgeMarkdown = ({msg} : {
    msg: string
}) => {
  return (
    <div className=''>
    <ReactMarkDown
    
    components={{
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>
            {children}
          </a>
        ),
      }}>
       {msg}
    </ReactMarkDown>

    </div>
  )
}

export default KnowledgeMarkdown