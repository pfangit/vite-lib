import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const Thinking = () => {
  return <div className={'pd-1'}>think ........</div>;
};

const Markdown = () => {
  const md = `Normal text, <think>This is a thinking note!</think> More normal text.`;
  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]} components={{ think: Thinking }}>
      {md}
    </ReactMarkdown>
  );
};

export default Markdown;
