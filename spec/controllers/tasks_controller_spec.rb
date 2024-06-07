require 'rails_helper'

RSpec.describe Api::V1::TasksController, type: :controller do
  let(:valid_attributes) {
    { title: 'Test Task', description: 'This is a test task', status: 'todo' }
  }

  let(:invalid_attributes) {
    { title: nil, description: 'This is a test task', status: 'todo' }
  }

  let(:new_attributes) {
    { title: 'Updated Task', status: :in_progress }
  }

  before do
    Task.create!(title: 'Test Task 1', status: :in_progress)
    Task.create!(title: 'Test Task 2', status: :done)
  end

  let(:task) { Task.create!(valid_attributes) }

  describe "GET #index" do
    it "returns a success response" do
      get :index, format: :json
      expect(response).to be_successful
    end
  end

  describe "POST #create" do
    context "with valid params" do
      it "creates a new Task" do
        expect {
          post :create, params: { task: valid_attributes }, format: :json
        }.to change(Task, :count).by(1)
      end

      it "renders a JSON response with the new task" do
        post :create, params: { task: valid_attributes }, format: :json
        expect(response).to have_http_status(:created)
        expect(response.content_type).to eq('application/json; charset=utf-8')
        expect(response.location).to eq(api_v1_task_url(Task.last))      end
    end

    context "with invalid params" do
      it "renders a JSON response with errors for the new task" do
        post :create, params: { task: invalid_attributes }, format: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end

  describe "PUT #update" do
    context "with valid params" do
      it "updates the requested task" do
        put :update, params: { id: task.id, task: new_attributes }, format: :json
        task.reload
        expect(task.title).to eq('Updated Task')
      end

      it "renders a JSON response with the task" do
        put :update, params: { id: task.id, task: new_attributes }, format: :json
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end

    context "with invalid params" do
      it "renders a JSON response with errors for the task" do
        put :update, params: { id: task.id, task: invalid_attributes }, format: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested task" do
      task
      expect {
        delete :destroy, params: { id: task.id }, format: :json
      }.to change(Task, :count).by(-1)
    end
  end
end