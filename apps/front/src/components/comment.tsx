type CommentProps = {
  url?: string;
  author: string;
  text: string;
  timecode?: number;
};

export const Comment = ({ url, author, text }: CommentProps) => {
  return (
    <a href={url}>
      <div className="card card-compact bg-base-200 card-bordered">
        <div className="card-body">
          <h4 className="text-sm card-title">{author}</h4>
          <p className="line-clamp-2">{text}</p>
        </div>
      </div>
    </a>
  );
};
