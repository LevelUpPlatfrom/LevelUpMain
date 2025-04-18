// frontend/client/src/components/CoursePreviewCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const CardWrapper = styled.div`
  background-color: var(--bg-secondary); // Use secondary for cards
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--card-shadow);
  transition: ${({ theme }) => theme.transition};
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
  height: 100%; // Ensure cards in a grid align height

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
     /* Add a subtle border color change on hover */
    border-color: var(--text-accent);
  }

  body.dark & { // Use body class for dark mode targeting
    background-color: var(--bg-secondary);
    border-color: var(--border-color);
    &:hover {
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
      border-color: var(--text-accent);
    }
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px; // Consistent image height
  object-fit: cover;
  display: block;
  border-bottom: 1px solid var(--border-color);
`;

const CardContent = styled.div`
  padding: var(--spacing-large);
  flex-grow: 1; // Take remaining space
  display: flex;
  flex-direction: column; // Stack content vertically
`;

const CardTitle = styled.h3`
  font-size: 1.3rem; // Slightly larger title
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: var(--spacing-small);
  color: var(--text-primary);
  line-height: 1.3;
`;

const CardDescription = styled.p`
  font-size: 0.95rem;
  margin-bottom: var(--spacing-medium);
  color: var(--text-secondary);
  flex-grow: 1; // Push button down
  line-height: 1.5;
`;

const CardButton = styled(Link)`
  display: inline-block;
  background: linear-gradient(90deg, var(--neon-purple), color-mix(in srgb, var(--neon-purple) 70%, var(--neon-blue))); // Gradient button
  color: ${({ theme }) => theme.colors.white};
  padding: var(--spacing-small) var(--spacing-large); // Larger padding
  border-radius: 6px;
  text-align: center;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-decoration: none;
  align-self: flex-start; // Align button left
  margin-top: auto; // Push to bottom
  transition: ${({ theme }) => theme.transition};
  border: none;

  &:hover {
    filter: brightness(1.1);
    transform: scale(1.03);
    text-decoration: none;
     box-shadow: 0 4px 15px color-mix(in srgb, var(--neon-purple) 30%, transparent);
  }
`;

// Component
const CoursePreviewCard = ({ course }) => {
  if (!course) return <CardWrapper>Loading...</CardWrapper>; // Basic loading state

  return (
    <CardWrapper>
      <CardImage src={course.imageUrl || "https://via.placeholder.com/400x200?text=LevelUp+Course"} alt={course.title} />
      <CardContent>
        <CardTitle>{course.title || 'Untitled Course'}</CardTitle>
        <CardDescription>{course.description || 'No description available.'}</CardDescription>
        {/* Link to the specific course page */}
        <CardButton to={`/course/${course._id}`}>
          View Journey
        </CardButton>
      </CardContent>
    </CardWrapper>
  );
};
export default CoursePreviewCard;