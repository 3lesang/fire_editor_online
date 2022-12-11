import MediaManager from './mediaManager';
import { useEffect, useState } from 'react';
import { Project } from './types';
import instance from '../api';

export default function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<number>(0);
  const [projectUser, setProjectUser] = useState<string>('');
  const [projectId, setProjectId] = useState<string>('');
  const [projectName, setProjectName] = useState<string>('');
  const [projectWidth, setProjectWidth] = useState<number>(1920);
  const [projectHeight, setProjectHeight] = useState<number>(1080);
  const [projectFramerate, setProjectFramerate] = useState<number>(30);
  const [projectDuration, setProjectDuration] = useState<number>(0);

  useEffect(() => {
    if (currentProject >= projects.length) return;
    setProjectId(projects[currentProject]._id);
    setProjectName(projects[currentProject].name);
    setProjectWidth(projects[currentProject].width);
    setProjectHeight(projects[currentProject].height);
    setProjectFramerate(projects[currentProject].framerate);
    setProjectDuration(projects[currentProject].duration);
  }, [currentProject, projects]);

  useEffect(() => {
    if (sessionStorage.getItem('token') != null) {
      instance.get('/getEmail').then((res) => {
        setProjectUser(res.data.email);
      });
    }
  }, []);

  useEffect(() => {
    if (projectUser === '') return;
    instance.get('/getProjects').then((res) => {
      setProjects(res.data);
    });
  }, [projectUser]);

  return (
    <MediaManager
      projectUser={projectUser}
      setProjectUser={setProjectUser}
      projectHeight={projectHeight}
      setProjectHeight={setProjectHeight}
      projectWidth={projectWidth}
      setProjectWidth={setProjectWidth}
      projectFramerate={projectFramerate}
      setProjectFramerate={setProjectFramerate}
      projectName={projectName}
      setProjectName={setProjectName}
      projectId={projectId}
      setProjectId={setProjectId}
      projectDuration={projectDuration}
      setProjectDuration={setProjectDuration}
      projects={projects}
      setProjects={setProjects}
    />
  );
}
