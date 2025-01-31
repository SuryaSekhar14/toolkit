'use client';

import React, { useState } from "react";
import { FaHeart, FaShare, FaComment } from "react-icons/fa";
import Link from "next/link";

interface AppCardProps {
	icon?: React.ReactNode;
	title: string;
	description: string | React.ReactNode;
	link: string;
}

const AppCard: React.FC<AppCardProps> = ({
	icon,
	title,
	description,
	link,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpand = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div className="w-full rounded overflow-hidden shadow-lg p-2 bg-[#ffffff] flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300">
			<Link href={link} className="flex flex-grow" >
				<div className="p-4 flex-grow">
					<div className="flex items-center mb-2">
						{icon && <div className="mr-2">{icon}</div>}
						<div className="font-bold text-xl text-black">{title}</div>
					</div>
					<p className="text-black text-base mt-4">
						{/* {isExpanded || description.length <= 120 ? description : `${description.substring(0, 120)}...`} */}
						{description}
					</p>
					{/* {description.length > 120 && (
						<button onClick={toggleExpand} className="text-blue-500">
							{isExpanded ? "Show less" : "Show more"}
						</button>
					)} */}
				</div>
			</Link>
			<div className="flex justify-end gap-2 p-2">
				<span className="text-gray-600">
					<FaHeart />
				</span>
				<span className="text-gray-600">
					<button onClick={() => navigator.clipboard.writeText(window.location.origin + link)}>
						<FaShare />
					</button>
				</span>
			</div>
		</div>
	);
};

export default AppCard;
