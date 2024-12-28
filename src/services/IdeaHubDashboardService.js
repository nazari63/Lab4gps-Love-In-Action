import api from "./api";

const IdeaHubDashboardService = {
  /**
   * Fetch the list of ideas displayed on the dashboard.
   * Corresponds to "GET /api/dashboard/"
   * Returns a list of ideas with metadata (featured, pinned, etc.)
   */
  fetchDashboardIdeas: () => {
    return api.get("/ideadashboard/dashboard/");
  },

  /**
   * Fetch full details for a single idea.
   * Corresponds to "GET /api/ideas/<id>/"
   * Used when user clicks "Click to read more..."
   * Returns detailed fields (problem, solution, resources, alignment, tags, attachments)
   */
  fetchIdeaDetail: (ideaId) => {
    return api.get(`/ideadashboard/ideas/${ideaId}/`);
  },

  /**
   * Record a user interaction with an idea, such as discussion, vote, or track action.
   * Corresponds to "POST /api/ideas/interaction/"
   * Body should contain { idea_id: number, interaction_type: 'discussion'|'vote'|'track' }
   * Requires authentication.
   */
  recordIdeaInteraction: (ideaId, interactionType) => {
    return api.post("/ideadashboard/ideas/interaction/", {
      idea_id: ideaId,
      interaction_type: interactionType,
    });
  },

  /**
   * Record that a user viewed an idea in detail.
   * Corresponds to "POST /api/ideas/view/"
   * Body should contain { idea_id: number }
   * Requires authentication.
   */
  recordIdeaView: (ideaId) => {
    return api.post("/ideadashboard/ideas/view/", {
      idea_id: ideaId,
    });
  },

  /**
   * Fetch attachments for a given idea.
   * Corresponds to "GET /api/ideas/attachments/?idea_id=<id>"
   * Returns a list of attachments with file URLs and captions.
   */
  fetchIdeaAttachments: (ideaId) => {
    return api.get("/ideadashboard/ideas/attachments/", {
      params: { idea_id: ideaId },
    });
  },

  /**
   * Get the current user's dashboard state.
   * Corresponds to "GET /api/user/state/"
   * Returns user's current active_page and selected_idea if any.
   * Requires authentication.
   */
  getUserDashboardState: () => {
    return api.get("/ideadashboard/user/state/");
  },

  /**
   * Update the user's dashboard state.
   * Corresponds to "POST /api/user/state/"
   * Body can contain { active_page: string, selected_idea_id: number|null }
   * If selected_idea_id is null, it clears the selected idea.
   * Requires authentication.
   */
  updateUserDashboardState: (activePage, selectedIdeaId = null) => {
    return api.post("/ideadashboard/user/state/", {
      active_page: activePage,
      selected_idea_id: selectedIdeaId,
    });
  },
};

export default IdeaHubDashboardService;
