import {Link, Navigate, useParams} from 'react-router-dom';
import {IssueComment} from '../components/IssueComment';
import {useIssue} from "../hooks";
import {Issue} from "../../interfaces";
import {FC} from "react";
import {LoadingIcon} from "../../shared/components/LoadingIcon";

interface Props {
  issue: Issue
}

export const IssueView: FC<Props> = ({issue}) => {

  const params = useParams();
  const {id = '0'} = params;

  const {issueQuery, commentsQuery} = useIssue(+id);

  if (issueQuery.isLoading) {
    return <LoadingIcon/>
  }

  if (!issueQuery.data) {
    return <Navigate to="./issues/list/infinite"/>
  }

  return (
    <div className="row mb-5">
      <div className="col-12 mb-3">
        <Link to='./issues/list/infinite'>Go Back</Link>
      </div>

      {/* Primer comentario */}
      <IssueComment issue={issueQuery.data}/>

      {
        commentsQuery.isLoading && <LoadingIcon/>
      }

      {
        commentsQuery.data?.map(issue => (
          <IssueComment issue={issue} key={issue.id}/>
        ))
      }
    </div>
  )
}
