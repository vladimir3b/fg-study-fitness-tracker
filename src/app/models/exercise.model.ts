type ExerciseStatusType = 'completed' | 'cancelled' | null;

interface IExerciseModel {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date?: Date;
  state?: ExerciseStatusType;
}

export {
  ExerciseStatusType,
  IExerciseModel
};
