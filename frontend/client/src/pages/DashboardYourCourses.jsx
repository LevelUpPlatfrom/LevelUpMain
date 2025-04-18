// frontend/client/src/components/DashboardYourCourses.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const Card = styled.div` background-color: var(--bg-secondary); padding: var(--spacing-large); border-radius: var(--border-radius); box-shadow: var(--card-shadow); border: 1px solid var(--border-color); `;
const CardTitle = styled.h3` margin-bottom: var(--spacing-medium); font-size: 1.2rem; border-bottom: 1px solid var(--border-color); padding-bottom: var(--spacing-medium); color: var(--text-primary); `;
const CourseList = styled.div` display: flex; flex-direction: column; gap: var(--spacing-medium); `;
const CourseItemWrapper = styled.div` display: flex; align-items: center; gap: var(--spacing-medium); background-color: var(--bg-accent); padding: var(--spacing-medium); border-radius: 6px; transition: background-color 0.2s ease; &:hover { background-color: color-mix(in srgb, var(--border-color) 50%, transparent); }`;
const CourseImage = styled.img` width: 60px; height: 60px; object-fit: cover; border-radius: 4px; flex-shrink: 0; background-color: var(--border-color); `;
const CourseInfo = styled.div` flex-grow: 1; h5 { margin-bottom: var(--spacing-xsmall); font-size: 1rem; font-weight: ${({ theme }) => theme.fontWeights.bold}; color: var(--text-primary); } `;
const CourseProgress = styled.p` font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0; `;
const ContinueButton = styled(Link)` margin-left: auto; padding: var(--spacing-small) var(--spacing-medium); font-size: 0.8rem; flex-shrink: 0; background: linear-gradient(90deg, var(--neon-blue), color-mix(in srgb, var(--neon-blue) 70%, var(--neon-green))); color: ${({ theme }) => theme.colors.darkText}; border-radius: 4px; text-decoration: none; text-align: center; font-weight: ${({ theme }) => theme.fontWeights.bold}; &:hover { filter: brightness(1.1); text-decoration: none; transform: scale(1.03); } `;
const ExploreLink = styled(Link)` font-weight: ${({ theme }) => theme.fontWeights.medium}; `;

// Component
const DashboardYourCourses = ({ courses }) => {
  if (!courses) return <Card><p>Loading courses...</p></Card>;
  return ( <Card> <CardTitle>Your Journeys</CardTitle> {courses.length === 0 ? ( <p>You haven't started any journeys yet. <ExploreLink to="/">Explore Courses</ExploreLink></p> ) : ( <CourseList> {courses.map(course => ( <CourseItemWrapper key={course._id}> <CourseImage src={course.imageUrl || 'https://via.placeholder.com/60?text=C'} alt={course.title} /> <CourseInfo> <h5>{course.title}</h5> {/* TODO: Replace with real progress */} <CourseProgress>Progress: 0%</CourseProgress> </CourseInfo> <ContinueButton to={`/course/${course._id}`}> Continue </ContinueButton> </CourseItemWrapper> ))} </CourseList> )} </Card> );
};
export default DashboardYourCourses;