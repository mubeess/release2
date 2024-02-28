/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AttendanceSummaryResponse } from "./AttendanceSummaryResponse";
import type { BasicSchoolInformationDto } from "./BasicSchoolInformationDto";
import type { ClassInformationDto } from "./ClassInformationDto";
import type { ClassLevelTraitConfigurationResponse } from "./ClassLevelTraitConfigurationResponse";
import type { EvaluatorCommentDto } from "./EvaluatorCommentDto";
import type { EvaluatorStudentSkillAssessmentDto } from "./EvaluatorStudentSkillAssessmentDto";
import type { GradeDto } from "./GradeDto";
import type { SkillRatingDefinitionDto } from "./SkillRatingDefinitionDto";
import type { StudentDto } from "./StudentDto";
import type { StudentEvaluationScoreResponse } from "./StudentEvaluationScoreResponse";
import type { StudentSkillAssessmentDto } from "./StudentSkillAssessmentDto";
import type { StudentTraitAssessmentDto } from "./StudentTraitAssessmentDto";
import type { SubjectTeacherDto } from "./SubjectTeacherDto";
import type { SubjectTraitAssessmentResponse } from "./SubjectTraitAssessmentResponse";
import type { TermCommentDto } from "./TermCommentDto";
import type { TermDto } from "./TermDto";
import type { TermResultAndAssessmentDef } from "./TermResultAndAssessmentDef";

export type StudentReportResponse = {
  attendance?: AttendanceSummaryResponse;
  class_information?: ClassInformationDto;
  class_level_trait_configuration_response?: ClassLevelTraitConfigurationResponse;
  class_size?: number;
  evaluation_scores?: Array<StudentEvaluationScoreResponse>;
  evaluator_comments?: Array<EvaluatorCommentDto>;
  evaluator_skill_assessments?: Array<EvaluatorStudentSkillAssessmentDto>;
  grades?: Array<GradeDto>;
  school_information?: BasicSchoolInformationDto;
  skill_assessments?: Array<StudentSkillAssessmentDto>;
  skill_rating_definitions?: Array<SkillRatingDefinitionDto>;
  student?: StudentDto;
  student_trait_assessments?: Array<StudentTraitAssessmentDto>;
  subject_teachers?: Array<SubjectTeacherDto>;
  subject_trait_assessment_responses?: Array<SubjectTraitAssessmentResponse>;
  term?: TermDto;
  term_comments?: Array<TermCommentDto>;
  term_result?: TermResultAndAssessmentDef;
};
