import React from "react";
import Trash from "../icons/Trash";

/* eslint-disable react/prop-types */
const NoteCard = ({ note }) => {
	const textAreaRef = React.useRef(null);
	const [position, setPositon] = React.useState(JSON.parse(note.position));
	const cardRef = React.useRef(null);

	const colors = JSON.parse(note.colors);
	const body = JSON.parse(note.body);

	let mouseStartPos = { x: 0, y: 0 };

	React.useEffect(() => {
		autoGrow(textAreaRef);
	}, []);

	function autoGrow(textAreaRef) {
		const { current } = textAreaRef;
		current.style.height = "auto";
		current.style.height = current.scrollHeight + "px";
	}

	const mouseDown = (e) => {
		//calcucates the x and y cooridnates of the position, when the mouse was clicked
		mouseStartPos.x = e.clientX;
		mouseStartPos.y = e.clientY;

		document.addEventListener("mousemove", mouseMove);
		document.addEventListener("mouseup", mouseUp);
	};

	const mouseMove = (e) => {
		//1 - Calculate move direction, tracks how much it is being moved from the clicked position
		let mouseMoveDir = {
			x: mouseStartPos.x - e.clientX,
			y: mouseStartPos.y - e.clientY,
		};

		//update the position for the next move
		mouseStartPos.x = e.clientX;
		mouseStartPos.y = e.clientY;

		//3 - Update card top and left position.
		setPositon({
			x: cardRef.current.offsetLeft - mouseMoveDir.x,
			y: cardRef.current.offsetTop - mouseMoveDir.y,
		});
	};

	const mouseUp = () => {
		document.removeEventListener("mousemove", mouseMove);
		document.removeEventListener("mouseup", mouseUp);
	};

		console.log(cardRef.current.offSetTop);

	return (
		<div
			draggable={true}
			className="card"
			ref={cardRef}
			style={{
				backgroundColor: colors.colorBody,
				left: `${position.x}px`,
				top: `${position.y}px`,
			}}
			onMouseDown={mouseDown}
			onMouseUp={mouseUp}
		>
			<div
				className="card-header"
				style={{ backgroundColor: colors.colorHeader }}
			>
				<Trash />
			</div>
			<div className="card-body">
				<textarea
					ref={textAreaRef}
					style={{ color: colors.colorText }}
					defaultValue={body}
					onInput={() => autoGrow(textAreaRef)}
				/>
				{body}
			</div>
		</div>
	);
};

export default NoteCard;
