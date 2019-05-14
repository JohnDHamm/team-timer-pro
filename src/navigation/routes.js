import SetupUserName from '../screens/setup/setup_user_name';
import SetupPaceUnits from '../screens/setup/setup_pace_units';
import TeamList from '../screens/team/team_list';
import AthleteEntry from '../screens/team/athlete_entry';
import AthletePaceEntry from '../screens/team/athlete_pace_entry';
import EditAthlete from '../screens/team/edit_athlete';
import SelectDiscipline from '../screens/workout/select_discipline';
import LapCount from '../screens/workout/lap_count';
import LapDistance from '../screens/workout/lap_distance';
import LapMetric from '../screens/workout/lap_metric';
import SelectAthletes from '../screens/workout/select_athletes';
import ConfirmWorkout from '../screens/workout/confirm_workout';
import ResultsList from '../screens/results/results_list';
import WorkoutDetail from '../screens/results/workout_detail';
import Menu from '../screens/settings/menu';
import UserName from '../screens/settings/user_name';
import PaceUnits from '../screens/settings/pace_units';

const Routes = {
  SetupRoutes: {
    SetupUserName: { screen: SetupUserName },
    SetupPaceUnits: { screen: SetupPaceUnits }
  },
  WorkoutRoutes: {
    SelectDiscipline: { screen: SelectDiscipline },
    LapCount: { screen: LapCount },
    LapDistance: { screen: LapDistance },
    LapMetric: { screen: LapMetric },
    SelectAthletes: { screen: SelectAthletes },
    ConfirmWorkout: { screen: ConfirmWorkout },
  },
  ResultsRoutes: {
    ResultsList: { screen: ResultsList },
    WorkoutDetail: { screen: WorkoutDetail }
  },
  TeamRoutes: {
    TeamList: { screen: TeamList },
    AthleteEntry: { screen: AthleteEntry },
    AthletePaceEntry: { screen: AthletePaceEntry },
    EditAthlete: { screen: EditAthlete },
  },
  SettingsRoutes: {
    Menu: { screen: Menu },
    UserName: { screen: UserName },
    PaceUnits: { screen: PaceUnits }
  }
};

export default Routes;
