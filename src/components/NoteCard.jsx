/* eslint-disable react/prop-types */
const NoteCard = ({ note }) => {
	let position = JSON.parse(note.position);
	const colors = JSON.parse(note.colors);
	const body = JSON.parse(note.body);

	return (
		<div className="card" style={{ backgroundColor: colors.colorBody }}>
			{body}

			<div
				className="card-header"
				style={{ backgroundColor: colors.colorHeader }}
			></div>
			<div className="card-body">
				<textarea style={{ color: colors.colorText }} defaultValue={body} />
			</div>
		</div>
	);
};

export default NoteCard;
